import axiosInstance from "@/lib/axios";
import type { ExpenseCategory } from "../types/expense.types";
import type {
  CreateExpenseCategory,
  UpdateExpenseCategory,
} from "../schema/expense-category.schema";
import type { APIResponse } from "@/lib/types";

export async function createExpenseCategory(data: CreateExpenseCategory) {
  const response = await axiosInstance.post("/expense/category/", data);
  return response.data;
}

export async function getExpenseCategoryByGroupId(
  groupId?: number,
): Promise<ExpenseCategory[]> {
  const response = await axiosInstance.get<APIResponse<ExpenseCategory[]>>(
    `/expense/category/group/${groupId}/`,
  );
  return response.data.data;
}

export async function getIndividualExpenseCategory(
  categoryId?: number,
): Promise<ExpenseCategory> {
  const response = await axiosInstance.get<APIResponse<ExpenseCategory>>(
    `/expense/category/${categoryId}`,
  );

  return response.data.data;
}

export async function deleteCategory(categoryId: number): Promise<void> {
  await axiosInstance.delete(`/expense/category/${categoryId}/`);
}

export async function updateCategory(
  data: UpdateExpenseCategory,
): Promise<ExpenseCategory> {
  const { id, name } = data;
  const response = await axiosInstance.put<APIResponse<ExpenseCategory>>(
    `/expense/category/${id}/`,
    { name },
  );
  return response.data.data;
}
