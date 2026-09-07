import z from "zod";

export const updateExpenseInfoSchema = z.object({
  id: z.number().positive(),
  title: z
    .string("Title is required.")
    .min(2, "Title must be at least 2 chars long."),
  category: z.string().transform((id) => (!id.trim() ? "" : Number(id))).optional()
});

export type UpdateExpenseInfoSchema = z.infer<typeof updateExpenseInfoSchema>;
