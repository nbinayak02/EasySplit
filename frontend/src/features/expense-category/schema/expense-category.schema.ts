import z from "zod";

export const expenseCategorySchema = z.object({
  name: z
    .string("Name is required.")
    .max(30, "Name ca contain 30 chars maximum."),
  group: z.string().transform((n) => Number(n)),
});

export const updateExpenseCategorySchema = z.object({
  id: z.number(),
  name: z
    .string("Name is required.")
    .max(30, "Name can contain 30 chars maximum."),
});

export type CreateExpenseCategory = z.infer<typeof expenseCategorySchema>;
export type UpdateExpenseCategory = z.infer<typeof updateExpenseCategorySchema>;
