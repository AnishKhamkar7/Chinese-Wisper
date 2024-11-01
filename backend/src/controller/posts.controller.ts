import { Request, Response } from "express";
import PostService from "../services/posts.service";
import {
  AddPostSchema,
  GetPostByIdSchema,
} from "../validation/posts.validation";
import ApiResponse from "../http/ApiResponse";
import handleApiResponse from "../http/handleApiResponse";
import { StatusCodes } from "http-status-codes";

export default class PostController {
  private postService: PostService;
  constructor(postService: PostService) {
    this.postService = postService;
  }

  addPost = async (
    req: Request<unknown, unknown, AddPostSchema["body"]>,
    res: Response
  ) => {
    const { initialContent, duration } = req.body;
    const { userId } = req;

    const newPost = await this.postService.addPost({
      initialContent,
      userId: userId!,
      duration,
    });

    const response = ApiResponse.success({
      data: newPost,
      message: "Post Created successfully",
      statusCode: StatusCodes.CREATED,
    });
    handleApiResponse(res, response);
  };

  getAllPosts = async (req: Request, res: Response) => {
    const allPosts = await this.postService.getAllPosts();

    const response = ApiResponse.success({
      data: allPosts,
      message: "Posts Retrieved successfully",
      statusCode: StatusCodes.OK,
    });
    handleApiResponse(res, response);
  };

  getPostById = async (
    req: Request<GetPostByIdSchema["params"]>,
    res: Response
  ) => {
    const { postId } = req.params;

    const post = await this.postService.getPostById(postId);

    const response = ApiResponse.success({
      data: post,
      message: "PostByID Retrieved successfully",
      statusCode: StatusCodes.OK,
    });
    handleApiResponse(res, response);
  };
}
