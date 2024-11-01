import { z } from "zod";

export const postSchema = z.object({
  body: z.object({
    initialContent: z
      .string({ required_error: "Content must be a string" })
      .trim()
      .min(3, { message: "Content must be at least 3 characters long" })
      .max(500, { message: "Content must be at most 500 characters long" }),

    duration: z
      .number({ required_error: "Duration must be a number" })
      .positive("Duration must be a positive number")
      .int("Duration must be an integer"),
  }),
});

export const getPostByIdSchema = z.object({
  params: z
    .object({
      postId: z
        .string({ required_error: "ID must be a string" })
        .trim()
        .uuid({ message: "ID must be a valid UUID" }),
    })
    .strict(),
});

export type AddPostSchema = z.infer<typeof postSchema>;
export type GetPostByIdSchema = z.infer<typeof getPostByIdSchema>;
