import { string } from "zod";
import ResponseRepository from "../repository/response.repository";
import PostService from "./posts.service";
import ErrorFactory from "../errors";

export default class ResponseService {
  private responseRepository: ResponseRepository;
  private postService: PostService;

  constructor(
    responseRepository: ResponseRepository,
    postService: PostService
  ) {
    this.responseRepository = responseRepository;
    this.postService = postService;
  }

  findById = async (id: string) => {
    const response = await this.responseRepository.findById(id);

    if (!response) {
      throw ErrorFactory.notFoundError(
        "Response Not Found or ResponseId Invalid"
      );
    }

    return response;
  };

  addResponse = async ({
    userId,
    postId,
    content,
  }: {
    userId: string;
    postId: string;
    content: string;
  }) => {
    const post = await this.postService.findById(postId);

    const response = await this.responseRepository.createResponse({
      userId: userId,
      postId: post.id,
      content,
    });

    if (!response) {
      throw ErrorFactory.internalServerError(
        "Something went wrong creating the post response"
      );
    }

    return response;
  };

  getAllResponse = async ({ postId }: { postId: string }) => {
    const response = await this.responseRepository.getAllResponse({ postId });

    console.log(response);

    if (!response) {
      throw ErrorFactory.internalServerError(
        "Something Went Wrong Retrieving Responses"
      );
    }

    return response;
  };
}
