import z from "zod";

const payerSchema = z.object({
  id: z.number("Payer is required").min(1, "Payer is required."),
  amount: z
    .string()
    .min(1, "Amount is required.")
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount.")
    .transform((amount) => Number(amount)),
});

const splitSchema = z.object({
  type: z.enum(["EQUALLY", "PERCENTAGE", "AMOUNT"]),
  participants: z.array(z.number()),
  shares: payerSchema.array(),
});

export const expenseSchema = z
  .object({
    title: z
      .string()
      .min(2, "Expense title is required.")
      .max(30, "Title must be less than 30 chars long."),
    amount: z
      .string()
      .min(1, "Amount is required.")
      .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount.")
      .transform((amount) => Number(amount)),
    category: z
      .string()
      .transform((id) => (!id.trim() ? "" : Number(id)))
      .optional(),
    group: z.string().transform((id) => Number(id)),
    payers: payerSchema.array(),
    split: splitSchema,
  })
  .superRefine((data, context) => {
    // check if total paid amount is equal to total expense amount
    const totalPaidAmount = data.payers.reduce(
      (totalAmount, currentPayer) => totalAmount + currentPayer.amount,
      0,
    );

    if (data.amount !== totalPaidAmount) {
      context.addIssue({
        code: "custom",
        message: "Paid amount must be equal to expense amount.",
        path: ["payers", data.payers.length - 1, "amount"],
      });
    }

    // empty participants in equally will result to split equally among all group members
    // it's for spliting equally with all users by default

    // if split type is amount
    if (data.split.type === "AMOUNT") {
      if (data.split.shares.length <= 1) {
        context.addIssue({
          code: "custom",
          message: "At least two persons are required to split the bill.",
          path: ["split", "shares"],
        });
      }

      // if split is amount and sum is less than expense amount
      const totalSplitAmount = data.split.shares.reduce(
        (total, currentShare) => total + currentShare.amount,
        0,
      );

      if (totalSplitAmount !== data.amount) {
        context.addIssue({
          code: "custom",
          message: "Total split amount must be equal to expense amount.",
          path: ["split", "shares"],
        });
      }
    }

    // if split is percentage
    if (data.split.type === "PERCENTAGE") {
      if (data.split.shares.length <= 1) {
        context.addIssue({
          code: "custom",
          message: "At least two persons are required to split the bill.",
          path: ["split", "shares"],
        });
      }

      // if split is percentage and sum is less than 100%
      const totalSplitPercent = data.split.shares.reduce(
        (total, currentShare) => total + currentShare.amount,
        0,
      );
      if (totalSplitPercent !== 100) {
        context.addIssue({
          code: "custom",
          message: "Total split percentage must be equal to 100%.",
          path: ["split", "shares"],
        });
      }
    }
  });

export type CreateExpenseForm = z.input<typeof expenseSchema>;
export type CreateExpensePayload = z.output<typeof expenseSchema>;
