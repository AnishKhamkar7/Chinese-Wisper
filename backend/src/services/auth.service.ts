import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import envConfig from "../config/env.config";

export default class AuthService {
  static hashPassword = async (password: string) => {
    return bcrypt.hash(password, 10);
  };

  static comparePassword = async (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
  };

  static signToken = (id: string, tokenType: "access" | "refresh") => {
    if (tokenType === "refresh") {
      return sign({ id }, envConfig.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: envConfig.JWT_REFRESH_TOKEN_EXPIRY,
      });
    }

    return sign({ id }, envConfig.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: envConfig.JWT_ACCESS_TOKEN_EXPIRY,
    });
  };

  static signTokens = (id: string) => {
    return {
      accessToken: AuthService.signToken(id, "access"),
      refreshToken: AuthService.signToken(id, "refresh"),
    };
  };

  static verifyToken = (
    token: string | undefined,
    tokenType: "access" | "refresh"
  ) => {
    if (!token) return false;
    if (tokenType === "refresh") {
      return verify(token, envConfig.JWT_REFRESH_TOKEN_SECRET);
    }

    return verify(token, envConfig.JWT_ACCESS_TOKEN_SECRET);
  };
}
