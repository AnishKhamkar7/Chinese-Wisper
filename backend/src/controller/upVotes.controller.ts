import { Request, Response } from "express";
import { UpVoteResponse } from "../validation/upvotes.validation";
import UpVotesService from "../services/upVotes.service";
import PostService from "../services/posts.service";
import ResponseService from "../services/response.service";
import { StatusCodes } from "http-status-codes";
import ApiResponse from "../http/ApiResponse";
import handleApiResponse from "../http/handleApiResponse";

export default class UpVotesController {
  private postService: PostService;
  private responseService: ResponseService;
  private upVotesService: UpVotesService;
  constructor(
    upVotesService: UpVotesService,
    responseService: ResponseService,
    postService: PostService
  ) {
    this.upVotesService = upVotesService;
    this.postService = postService;
    this.responseService = responseService;
  }

  upVotesResponse = async (
    req: Request<UpVoteResponse["params"]>,
    res: Response
  ) => {
    const { userId } = req;
    const { postId, responseId } = req.params;

    const post = await this.postService.findById(postId);

    const postResponse = await this.responseService.findById(responseId);

    const upVote = await this.upVotesService.upVoteResponse({
      userId: userId!,
      postId: post.id,
      responseId: postResponse.id,
    });

    const response = ApiResponse.success({
      data: { post, postResponse, upVote },
      message: "Post Response upVoted successfully",
      statusCode: StatusCodes.CREATED,
    });
    handleApiResponse(res, response);
  };
}
