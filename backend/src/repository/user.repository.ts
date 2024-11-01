import { prisma } from "../db/prisma";

export default class UserRepository {
  findById = async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  };

  findByUsername = async (username: string) => {
    const user = await prisma.user.findFirst({ where: { username } });
    return user;
  };

  findByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  };

  createUser = async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    const user = await prisma.user.create({
      data: { username, email, password },
    });
    return user;
  };
}
