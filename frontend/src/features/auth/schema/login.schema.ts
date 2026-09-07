import z from "zod";

export const LoginSchema = z.object({
  email: z.email("Email is required."),
  password: z
    .string("Password is required.")
    .trim()
    .min(8, { message: "Password must be at least 8 chars long." }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
