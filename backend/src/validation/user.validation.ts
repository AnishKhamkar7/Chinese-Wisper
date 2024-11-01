import { z } from "zod";

export const registerSchema = z.object({
  body: z
    .object({
      username: z
        .string({ required_error: "Username must be a string" })
        .trim()
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(35, { message: "Username must be at most 35 characters long" }),
      email: z
        .string({ required_error: "Email must be a string" })
        .trim()
        .email({ message: "Invalid email address format" }),
      password: z
        .string({ required_error: "Password must be a string" })
        .trim()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(35, { message: "Password must be at most 35 characters long" }),
    })
    .strict(),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email must be a string" })
      .trim()
      .email({ message: "Invalid email address format" }),
    password: z
      .string({ required_error: "Password must be a string" })
      .trim()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(35, { message: "Password must not exceed 35 characters" }),
  }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
