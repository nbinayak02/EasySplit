import type { Creator, Timestamp } from "@/shared.types";
import type { CreateExpensePayload } from "../schema/expense.schema";

export type Expense = Creator &
  Timestamp &
  Omit<CreateExpensePayload, "payers" | "split"> & {
    id: number;
    split_type: string;
  };

export type InitialPayment = {
  expense: number;
  paid_by: number;
  amount: number;
};

export type SplitParticipants = {
  id: number;
  amount: number;
  user: number;
  expense: number;
};

export type GroupExpense = Expense & {
  initial_payment: InitialPayment[];
  split_participants: SplitParticipants[];
};
