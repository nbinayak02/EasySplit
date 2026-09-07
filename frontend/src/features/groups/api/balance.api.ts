import axiosInstance from "@/lib/axios";
import type { Balance } from "../types/balance.types";
import type { APIResponse } from "@/lib/types";

export async function getGroupBalance(
  groupId?: number,
): Promise<Array<Balance>> {
  const response = await axiosInstance.get<APIResponse<Balance[]>>(
    `/finance/balance/group/${groupId}/`,
  );
  return response.data.data;
}
