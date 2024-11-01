import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import asyncHandler from "../utils/asyncHandler";

import UserRepository from "../repository/user.repository";
import PostService from "../services/posts.service";
import PostRepository from "../repository/posts.repository";
import PostController from "../controller/posts.controller";
import ResponseService from "../services/response.service";
import UpVoteRepository from "../repository/upVotes.repository";
import UpVotesController from "../controller/upVotes.controller";
import UpVoteService from "../services/upVotes.service";
import ResponseRepository from "../repository/response.repository";

const postRepository = new PostRepository();
const userRepository = new UserRepository();
const responseRepository = new ResponseRepository();
const postService = new PostService(postRepository, userRepository);
const responseService = new ResponseService(responseRepository, postService);
const upVotesRepository = new UpVoteRepository();
const upVoteService = new UpVoteService(upVotesRepository);
const upVotesController = new UpVotesController(
  upVoteService,
  responseService,
  postService
);

const apiRoute = Router();

apiRoute
  .route("/:postId/:responseId")
  .post(authMiddleware, asyncHandler(upVotesController.upVotesResponse));

export default apiRoute;
