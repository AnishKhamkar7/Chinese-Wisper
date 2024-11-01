import { z } from "zod";

export const upVoteResponse = z.object({
  params: z.object({
    postId: z
      .string({ required_error: "Project ID must be a string" })
      .trim()
      .uuid({ message: "Project ID must be a valid UUID" }),
    responseId: z
      .string({ required_error: "Project ID must be a string" })
      .trim()
      .uuid({ message: "Project ID must be a valid UUID" }),
  }),
});

export type UpVoteResponse = z.infer<typeof upVoteResponse>;
