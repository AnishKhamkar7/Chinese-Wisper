import { z } from "zod";

export const addResponseSchema = z.object({
  body: z
    .object({
      content: z
        .string({ required_error: "Response must be a string" })
        .trim()
        .min(1, { message: "Response must be at least 1 character long" })
        .max(200, { message: "Response must be at most 200 characters long" }),
    })
    .strict(),
  params: z
    .object({
      postId: z
        .string({ required_error: "Project ID must be a string" })
        .trim()
        .uuid({ message: "Project ID must be a valid UUID" }),
    })
    .strict(),
});

export const getAllResponse = z.object({
  params: z.object({
    postId: z
      .string({ required_error: "Project ID must be a string" })
      .trim()
      .uuid({ message: "Project ID must be a valid UUID" }),
  }),
});
export type AddResponseSchema = z.infer<typeof addResponseSchema>;
export type GetAllResponse = z.infer<typeof getAllResponse>;
