import { Request, Response } from "express";
import UserService from "../services/user.service";
import PostService from "../services/posts.service";
import ResponseService from "../services/response.service";
import ApiResponse from "../http/ApiResponse";
import handleApiResponse from "../http/handleApiResponse";
import { StatusCodes } from "http-status-codes";
import {
  AddResponseSchema,
  GetAllResponse,
} from "../validation/response.validation";

export default class ResponseController {
  private responseService: ResponseService;
  private postService: PostService;
  constructor(responseService: ResponseService, postService: PostService) {
    this.responseService = responseService;
    this.postService = postService;
  }

  addResponse = async (
    req: Request<
      AddResponseSchema["params"],
      unknown,
      AddResponseSchema["body"]
    >,
    res: Response
  ) => {
    const { userId } = req;
    const { postId } = req.params;
    const { content } = req.body;

    const postResponse = await this.responseService.addResponse({
      userId: userId!,
      postId,
      content,
    });

    const response = ApiResponse.success({
      data: postResponse,
      message: "Post Response Created successfully",
      statusCode: StatusCodes.CREATED,
    });
    handleApiResponse(res, response);
  };

  getAllResponse = async (
    req: Request<GetAllResponse["params"]>,
    res: Response
  ) => {
    const { postId } = req.params;

    const post = await this.postService.findById(postId);

    const allResponses = await this.responseService.getAllResponse({
      postId: post.id,
    });

    const response = ApiResponse.success({
      data: { post, allResponses },
      message: "Posts Retrieved successfully",
      statusCode: StatusCodes.OK,
    });
    handleApiResponse(res, response);
  };
}
