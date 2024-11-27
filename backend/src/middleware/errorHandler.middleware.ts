import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JsonWebTokenError } from "jsonwebtoken";

import { ZodError } from "zod";

import AppError from "../errors/AppError";
import ApiResponse from "../http/ApiResponse";
import handleApiResponse from "../http/handleApiResponse";

export default function errorHandlerMiddleware(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.info("Responding with error response");
  console.error("In Error handler middleware.\n", error);

  if (error instanceof AppError) {
    console.info("Error is an instance of AppError");
    const response = ApiResponse.failure({
      statusCode: error.statusCode,
      message: error.message,
      error: {
        ...error,
        stack: error.stack,
      },
    });
    handleApiResponse(res, response);
  } else if (error instanceof JsonWebTokenError) {
    console.info("Error is an instance of jwt.JsonWebTokenError");
    const response = ApiResponse.failure({
      statusCode: StatusCodes.UNAUTHORIZED,
      message: "RefreshTokenInvalid",
      error: {
        stack: error.stack,
      },
    });
    handleApiResponse(res, response);
  } else if (error instanceof ZodError) {
    console.info("Error is an instance of ZodError");
    const response = ApiResponse.failure({
      statusCode: StatusCodes.BAD_REQUEST,
      message: "Validation Error",
      error: {
        ...error,
        stack: error.stack,
      },
    });
    handleApiResponse(res, response);
  } else {
    console.info("Error is not an instance of AppError");
    const response = ApiResponse.failure({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      error: {
        ...error,
        stack: error.stack,
      },
    });
    handleApiResponse(res, response);
  }
}