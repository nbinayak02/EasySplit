import z from "zod";

export const createSettlementSchema = z
  .object({
    paid_by: z.number("Payer is required"),
    group: z.number("Group is required."),
    paid_to: z
      .string()
      .min(1, "Receiver is required.")
      .transform((n) => Number(n)),
    amount: z
      .string()
      .min(1, "Amount is required.")
      .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount.")
      .transform((amount) => Number(amount)),
  })
  .refine((data) => data.paid_by !== data.paid_to, {
    error: "You cannot pay to yourself.",
    path: ["paid_to"],
  });

export const updateSettlementSchema = createSettlementSchema.extend({
  id: z.number("Id is required"),
});

export type CreateSettlementForm = z.input<typeof createSettlementSchema>;
export type CreateSettlementPayload = z.output<typeof createSettlementSchema>;
export type UpdateSettlementForm = z.input<typeof updateSettlementSchema>;
export type UpdateSettlementPayload = z.output<typeof updateSettlementSchema>;
