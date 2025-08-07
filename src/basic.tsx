import { z } from "zod";

// Making the username validation
export const signupScheme = z
  .object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Too short password"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

export const loginScheme = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password Required"),
});

export type SignupFomrData = z.infer<typeof signupScheme>;
export type LoginFormData = z.infer<typeof loginScheme>;
