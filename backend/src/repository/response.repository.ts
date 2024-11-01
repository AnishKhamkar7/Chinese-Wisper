import { prisma } from "../db/prisma";

export default class ResponseRepository {
  findById = async (id: string) => {
    const response = await prisma.response.findUnique({
      where: { id },
    });

    return response;
  };

  createResponse = async ({
    userId,
    postId,
    content,
  }: {
    userId: string;
    postId: string;
    content: string;
  }) => {
    const response = await prisma.response.create({
      data: {
        userId,
        content,
        postId,
      },
    });

    return response;
  };

  getAllResponse = async ({ postId }: { postId: string }) => {
    const response = await prisma.response.findMany({
      where: { postId },
    });

    return response;
  };
}
