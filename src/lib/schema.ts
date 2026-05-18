import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(2, "Name is too short"),

  dob: z.string().min(1, "Date of birth is required"),

  email: z.string().email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export const signInSchema = z.object({
  email: z.string().email(),

  password: z.string().min(1),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type SignInSchema = z.infer<typeof signInSchema>;