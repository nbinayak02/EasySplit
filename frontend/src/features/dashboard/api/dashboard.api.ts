import axiosInstance from "@/lib/axios";
import type { UserBalanceStats } from "../types/dashboard.types";

export async function getUserBalanceStats(userId: number):Promise<UserBalanceStats> {
    const response = await axiosInstance.get(`/finance/balance/user/${userId}/`);
    return response.data.data;
}