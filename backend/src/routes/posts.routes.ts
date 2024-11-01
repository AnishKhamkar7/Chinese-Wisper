import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import asyncHandler from "../utils/asyncHandler";

import UserRepository from "../repository/user.repository";
import PostService from "../services/posts.service";
import PostRepository from "../repository/posts.repository";
import PostController from "../controller/posts.controller";

const postRepository = new PostRepository();
const userRepository = new UserRepository();
const postService = new PostService(postRepository, userRepository);
const postController = new PostController(postService);

const apiRoute = Router();

apiRoute
  .route("/addPost")
  .post(authMiddleware, asyncHandler(postController.addPost));

apiRoute.route("/").get(postController.getAllPosts);

apiRoute.route("/:postId").get(postController.getPostById);

export default apiRoute;
