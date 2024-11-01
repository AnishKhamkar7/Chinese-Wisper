import UserRepository from "../repository/user.repository";
import AuthService from "./auth.service";
import ErrorFactory from "../errors";

export default class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  checkExistingUser = async (username: string, email: string) => {
    const existingUser = await Promise.all([
      this.userRepository.findByUsername(username),
      this.userRepository.findByEmail(email),
    ]);

    const userExists = existingUser.some((user) => user !== null);

    if (userExists) {
      throw ErrorFactory.conflictError("Username or Email already exists");
    }
  };

  findById = async (id: string) => {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw ErrorFactory.notFoundError("User Not Found");
    }

    return user;
  };

  findByEmail = async (email: string) => {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw ErrorFactory.notFoundError("User Not Found");
    }

    return user;
  };

  registerUser = async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    await this.checkExistingUser(username, email);

    const hashedPassword = await AuthService.hashPassword(password);

    const user = await this.userRepository.createUser({
      username,
      email,
      password: hashedPassword,
    });
    if (!user) {
      throw ErrorFactory.internalServerError("User Registration Failed");
    }

    const { accessToken, refreshToken } = AuthService.signTokens(user.id);

    return { user, accessToken, refreshToken };
  };

  loginUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const user = await this.findByEmail(email);

    const isPasswordValid = await AuthService.comparePassword(
      password,
      user.password
    );
    if (!isPasswordValid) {
      throw ErrorFactory.unauthorizedError("Password is incorrect");
    }

    const { accessToken, refreshToken } = AuthService.signTokens(user.id);

    return { user, accessToken, refreshToken };
  };

  refreshToken = async (token: string) => {
    const { id } = AuthService.verifyToken(token, "refresh") as {
      id?: string;
    };

    if (!id) {
      throw ErrorFactory.unauthorizedError("Invalid token");
    }

    await this.findById(id);

    const { accessToken, refreshToken } = AuthService.signTokens(id);

    return { accessToken, refreshToken, id };
  };
}
