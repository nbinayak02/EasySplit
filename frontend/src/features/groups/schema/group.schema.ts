import z from "zod";
import { ImageSchema } from "@/schema/image.schema";

const uuid4Regex =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

export const GroupSchema = z.object({
  name: z
    .string("Group name is required.")
    .max(30, "Group name must be less than 30 chars."),
  description: z.string().optional(),
  profile_image: ImageSchema,
});

export const JoinGroupSchema = z.object({
  group_id: z
    .string("Group ID is required.")
    .regex(uuid4Regex, { error: "Invalid Group ID" }),
});

export const UpdateGroupSchema = z.object({
  id: z.number(),
  name: z
    .string("Group name is required.")
    .max(30, "Group name must be less than 30 chars.")
    .optional(),
  description: z.string().optional(),
});

export const UpdateGroupProfilePictureSchema = z.object({
  id: z.number(),
  profile_image: ImageSchema,
});

export type GroupSchema = z.infer<typeof GroupSchema>;
export type JoinGroupSchema = z.infer<typeof JoinGroupSchema>;
export type UpdateGroupSchema = z.infer<typeof UpdateGroupSchema>;
export type UpdateGroupProfileSchema = z.infer<
  typeof UpdateGroupProfilePictureSchema
>;
