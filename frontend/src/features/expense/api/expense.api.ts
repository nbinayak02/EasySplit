import axiosInstance from "@/lib/axios";
import type { Expense } from "../types/expense.types";
import type { CreateExpensePayload } from "../schema/expense.schema";
import type { UpdateExpenseInfoSchema } from "../schema/updateExpense.schema";

export async function createExpense(
  data: CreateExpensePayload,
): Promise<Expense> {
  const response = await axiosInstance.post("/expense/", data);
  return response.data;
}

export async function deleteExpense(expenseId: number) {
  const response = await axiosInstance.delete(`/expense/${expenseId}/`);
  return response.data.data;
}

export async function updateExpenseInfo(data: UpdateExpenseInfoSchema) {
  const { id, ...payload } = data;
  const response = await axiosInstance.patch(`/expense/${id}/`, payload);
  return response.data.data;
}

export async function getExpenseInfo(expenseId?: number): Promise<Expense> {
  const response = await axiosInstance.get(`/expense/${expenseId}/`);
  return response.data.data;
}
