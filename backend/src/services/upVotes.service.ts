import ErrorFactory from "../errors";
import UpVoteRepository from "../repository/upVotes.repository";
export default class UpVoteService {
  private upVotRepository: UpVoteRepository;
  constructor(upVotRepository: UpVoteRepository) {
    this.upVotRepository = upVotRepository;
  }

  checkExistingUpvote = async ({
    userId,
    responseId,
    postId,
  }: {
    userId: string;
    responseId: string;
    postId: string;
  }) => {
    const existingUpVote = await this.upVotRepository.checkExistingUpVote({
      userId,
      responseId,
      postId,
    });

    if (existingUpVote) {
      throw ErrorFactory.badRequestError(
        "You have already voted for this response."
      );
    }
  };

  upVoteResponse = async ({
    userId,
    responseId,
    postId,
  }: {
    userId: string;
    responseId: string;
    postId: string;
  }) => {
    await this.checkExistingUpvote({ userId, postId, responseId });
    const response = await this.upVotRepository.createUpVotePost({
      userId,
      postId,
      responseId,
    });

    return response;
  };
}
