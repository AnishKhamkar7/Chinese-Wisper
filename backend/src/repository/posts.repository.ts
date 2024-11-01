import { prisma } from "../db/prisma";

export default class PostRepository {
  findById = async (id: string) => {
    const post = await prisma.post.findUnique({ where: { id } });
    return post;
  };

  createPost = async ({
    initialContent,
    userId,
    title,
    nextEditTime,
  }: {
    initialContent: string;
    userId: string;
    title: string;
    nextEditTime: Date;
  }) => {
    const newPost = await prisma.post.create({
      data: {
        title,
        initialContent,
        userId,
        nextEditTime,
      },
    });

    return newPost;
  };

  getAllPosts = async () => {
    const allPosts = await prisma.post.findMany();

    return allPosts;
  };
}
