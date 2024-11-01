import { prisma } from "../db/prisma";

export default class UpVoteRepository {
  createUpVotePost = async ({
    userId,
    responseId,
    postId,
  }: {
    userId: string;
    responseId: string;
    postId: string;
  }) => {
    return await prisma.responseVote.create({
      data: {
        userId,
        responseId,
        postId,
      },
    });
  };

  checkExistingUpVote = async ({
    userId,
    responseId,
    postId,
  }: {
    userId: string;
    responseId: string;
    postId: string;
  }) => {
    return await prisma.responseVote.findFirst({
      where: {
        postId: postId,
        responseId: responseId,
        userId: userId,
      },
    });
  };
}
