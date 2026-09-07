import axiosInstance from "@/lib/axios";
import type { Activity } from "../types/activity.types";
import type { APIResponse } from "@/lib/types";

export async function getActivitiesByUser(
  pageParam: number,
): Promise<APIResponse<Activity[]>> {
  const response = await axiosInstance.get(`/activity/user/?page=${pageParam}`);
  return response.data;
}
