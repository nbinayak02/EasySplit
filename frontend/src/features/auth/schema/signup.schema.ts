import z from "zod";

export const SignupSchema = z
  .object({
    first_name: z
      .string("First Name is required.")
      .trim()
      .min(2, "First Name must be at least 2 chars long.")
      .max(15, "First Name can contain 15 chars maximum."),
    last_name: z
      .string("Last Name is required.")
      .trim()
      .min(2, "Last Name must be at least 2 chars long.")
      .max(15, "First Name can contain 15 chars maximum."),

    email: z.email("Invalid email address."),
    password: z
      .string("Password is required.")
      .trim()
      .min(8, "Password must be at least 8 chars long."),
    confirm_password: z.string("Please confirm your password."),
  })
  .refine((data) => data.password === data.confirm_password, {
    error: "Password didn't matched.",
    path: ["confirm_password"],
  });

export type SignupFormSchema = z.infer<typeof SignupSchema>;
export type SignupFormPayload = Omit<SignupFormSchema, "confirm_password">;
