import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import ErrorFactory from "../errors";
import AuthService from "../services/auth.service";

// todo a better way to do this
declare module "express" {
  interface Request {
    userId?: string;
  }
}

declare module "jsonwebtoken" {
  interface JwtPayload {
    id?: string;
  }
}

export default function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  console.info("Authorization header", { authorization });
  if (!authorization) {
    throw ErrorFactory.unauthorizedError("Authorization header not found");
  }

  const [, token] = authorization.split(" ");
  console.info("Authorization token", { token });
  if (!token) {
    throw ErrorFactory.unauthorizedError("Authorization token not found");
  }

  try {
    const payload = AuthService.verifyToken(token, "access") as jwt.JwtPayload;
    const { id }: { id?: string } = payload;
    console.info("Authorization payload", { payload });

    if (!id) {
      throw ErrorFactory.unauthorizedError("Invalid payload");
    }
    req.userId = id;

    return next();
  } catch {
    throw ErrorFactory.unauthorizedError("Invalid token");
  }
}
