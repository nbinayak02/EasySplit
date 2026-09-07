import type {
  CreateSettlementPayload,
  UpdateSettlementPayload,
} from "../schema/settlement.schema";
import type {
  Settlement,
  SettlementDetail,
  SettlementStats,
  SimplifiedSettlement,
} from "../types/settlement.types";
import axiosInstance from "@/lib/axios";
import type { APIResponse } from "@/lib/types";

export async function createSettlement(
  data: CreateSettlementPayload,
): Promise<Settlement> {
  const response = await axiosInstance.post(`/finance/settlement/user/`, data);

  return response.data.data;
}

export async function getGroupSettlements(
  groupId?: number,
): Promise<Array<SettlementDetail>> {
  const response = await axiosInstance.get<APIResponse<SettlementDetail[]>>(
    `/finance/settlement/group/${groupId}/`,
  );
  return response.data.data;
}

export async function deleteSettlement(id?: number): Promise<void> {
  await axiosInstance.delete(`/finance/settlement/${id}/`);
}

export async function updateSettlement(
  data: UpdateSettlementPayload,
): Promise<SettlementDetail> {
  const { id, ...payload } = data;
  const response = await axiosInstance.patch<APIResponse<SettlementDetail>>(
    `/finance/settlement/${id}/`,
    payload,
  );
  return response.data.data;
}

export async function getSettlement(id?: number): Promise<SettlementDetail> {
  const response = await axiosInstance.get<APIResponse<SettlementDetail>>(
    `/finance/settlement/${id}/`,
  );
  return response.data.data;
}

export async function getSettlementStats(
  userId: number,
): Promise<SettlementStats[]> {
  const response = await axiosInstance.get(
    `/finance/settlement/user/${userId}/`,
  );
  return response.data.data;
}

export async function getSimplifiedSettlementTransactions(
  groupId?: number,
): Promise<SimplifiedSettlement[]> {
  const response = await axiosInstance.get(
    `/finance/settlement/simplified/${groupId}`,
  );
  return response.data.data;
}
