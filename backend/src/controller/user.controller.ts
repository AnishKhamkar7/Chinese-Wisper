import { Request, Response } from "express";
import UserService from "../services/user.service";
import { RegisterSchema } from "../validation/user.validation";
import { LoginSchema } from "../validation/user.validation";
import ApiResponse from "../http/ApiResponse";
import handleApiResponse from "../http/handleApiResponse";
import { StatusCodes } from "http-status-codes";
import setRefreshCookie from "../utils/setRefreshCookie";
import ErrorFactory from "../errors";

export default class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  registerUser = async (
    req: Request<unknown, unknown, RegisterSchema["body"]>,
    res: Response
  ) => {
    const { email, username, password } = req.body;

    const { user, accessToken, refreshToken } =
      await this.userService.registerUser({
        username,
        email,
        password,
      });

    setRefreshCookie(res, refreshToken, "default");

    const response = ApiResponse.success({
      data: { user, accessToken },
      message: "User Registered Successfully",
      statusCode: StatusCodes.CREATED,
    });
    handleApiResponse(res, response);
  };

  loginUser = async (
    req: Request<unknown, unknown, LoginSchema["body"]>,
    res: Response
  ) => {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } =
      await this.userService.loginUser({
        email,
        password,
      });

    setRefreshCookie(res, refreshToken, "default");

    const response = ApiResponse.success({
      data: { user, accessToken },
      message: "User Logged In",
      statusCode: StatusCodes.OK,
    });
    handleApiResponse(res, response);
  };

  logOutUser = async (_req: Request, res: Response) => {
    setRefreshCookie(res, "", "now");

    const response = ApiResponse.success({
      data: null,
      message: "User Logged Out",
      statusCode: StatusCodes.NO_CONTENT,
    });
    handleApiResponse(res, response);
  };

  refreshToken = async (req: Request, res: Response) => {
    const token: string | undefined = req.cookies?.refreshToken;
    console.info("Refresh Token: ", token);

    if (!token) {
      console.info("Refresh Token not found in cookies");
      throw ErrorFactory.badRequestError("Refresh Token not found");
    }

    const { accessToken, refreshToken, id } =
      await this.userService.refreshToken(token);

    setRefreshCookie(res, refreshToken, "default");

    const response = ApiResponse.success({
      data: { accessToken, userId: id },
      message: "Token refreshed successfully",
      statusCode: StatusCodes.OK,
    });
    handleApiResponse(res, response);
  };
}
