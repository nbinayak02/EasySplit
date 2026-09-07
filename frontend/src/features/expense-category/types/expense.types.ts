import type { Creator, Timestamp } from "@/shared.types";
import type { CreateExpenseCategory } from "../schema/expense-category.schema";

export type ExpenseCategory = CreateExpenseCategory & Timestamp & Creator & {
    id: number
}