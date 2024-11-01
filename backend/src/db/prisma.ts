import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export default async function connectDB() {
  try {
    await prisma.$connect();
    console.log("successfully connected to the database");
  } catch (error) {
    console.error("error connecting to the database");
    console.error("Error: ", error);
  }
}
