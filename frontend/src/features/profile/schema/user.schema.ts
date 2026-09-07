import { ImageSchema } from "@/schema/image.schema";
import z from "zod";

export const updateUserSchema = z.object({
  first_name: z
    .string("First Name is required.")
    .min(2, "First Name must be at least 2 chars long.")
    .max(15, "First Name can contain 15 chars maximum.")
    .optional(),

  last_name: z
    .string("Last Name is required.")
    .min(2, "Last Name must be at least 2 chars long.")
    .max(15, "First Name can contain 15 chars maximum.")
    .optional(),

  email: z.email("Email is required.").optional(),
});

export const updateProfilePictureSchema = z.object({
  profile_image: ImageSchema,
});

export const changePasswordSchema = z
  .object({
    password: z
      .string("Password is required.")
      .min(8, "Password must be at least 8 chars long."),
    confirmPassword: z
      .string("Confirm password is required.")
      .min(8, "Password didn't matched."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "Password didn't matched.",
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
export type UpdateUserForm = z.infer<typeof updateUserSchema>;
export type UpdateUserProfileForm = z.infer<typeof updateProfilePictureSchema>;
