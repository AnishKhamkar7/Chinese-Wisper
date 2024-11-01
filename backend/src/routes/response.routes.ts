import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import asyncHandler from "../utils/asyncHandler";

import UserRepository from "../repository/user.repository";
import PostService from "../services/posts.service";
import PostRepository from "../repository/posts.repository";
import ResponseController from "../controller/response.controller";
import ResponseRepository from "../repository/response.repository";
import ResponseService from "../services/response.service";

const postRepository = new PostRepository();
const userRepository = new UserRepository();
const responseRepository = new ResponseRepository();
const postService = new PostService(postRepository, userRepository);
const responseService = new ResponseService(responseRepository, postService);
const responseController = new ResponseController(responseService, postService);

const apiRouter = Router();

apiRouter
  .route("/:postId")
  .post(authMiddleware, asyncHandler(responseController.addResponse));

apiRouter
  .route("/:postId")
  .get(asyncHandler(responseController.getAllResponse));

export default apiRouter;
