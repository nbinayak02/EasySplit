import z from "zod";

export const searchParamsSchema = z.object({
  returnTo: z.string().optional(),
});
