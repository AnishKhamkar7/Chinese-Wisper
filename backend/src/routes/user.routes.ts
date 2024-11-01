import { Router } from "express";

import UserController from "../controller/user.controller";
import UserRepository from "../repository/user.repository";
import UserService from "../services/user.service";

import authMiddleware from "../middleware/auth.middleware";
import asyncHandler from "../utils/asyncHandler";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const apiRouter = Router();

apiRouter.route("/register").post(asyncHandler(userController.registerUser));

apiRouter.route("/login").post(asyncHandler(userController.loginUser));

apiRouter
  .route("/logout")
  .post(authMiddleware, asyncHandler(userController.logOutUser));

export default apiRouter;
