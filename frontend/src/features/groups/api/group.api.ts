import axiosInstance from "@/lib/axios";
import type { Group, GroupMemberList } from "../types/group.types";
import type {
  JoinGroupSchema,
  UpdateGroupSchema,
} from "../schema/group.schema";
import type { APIResponse } from "@/lib/types";
import type { GroupExpense } from "@/features/expense/types/expense.types";
import axios from "axios";

export async function createGroup(data: FormData) {
  const response = await axiosInstance.post<APIResponse<Group>>(
    "/group/",
    data,
  );
  return response.data;
}

export async function getAllGroupsByUser(): Promise<Group[]> {
  const response = await axiosInstance.get<APIResponse<Group[]>>("/group/user");
  return response.data.data;
}

export async function joinGroup(data: JoinGroupSchema): Promise<Group[]> {
  const response = await axiosInstance.post<APIResponse<Group[]>>(
    `/group/join/${data.group_id}/`,
  );
  return response.data.data;
}

export async function getGroupByGroupId(groupId?: string): Promise<Group> {
  const response = await axiosInstance.get<APIResponse<Group>>(
    `/group/view/${groupId}/`,
  );
  return response.data.data;
}

export async function getGroupById(groupId?: number): Promise<Group> {
  const response = await axiosInstance.get<APIResponse<Group>>(
    `/group/${groupId}/`,
  );
  return response.data.data;
}

export async function getGroupMembers(
  groupId?: number,
): Promise<Array<GroupMemberList>> {
  const response = await axiosInstance.get<APIResponse<GroupMemberList[]>>(
    `/user/group/${groupId}/`,
  );
  return response.data.data;
}

export async function getGroupExpenses(
  groupId?: number,
): Promise<Array<GroupExpense>> {
  const response = await axiosInstance.get<APIResponse<GroupExpense[]>>(
    `/expense/group/${groupId}`,
  );
  return response.data.data;
}

export async function updateGroup(data: UpdateGroupSchema): Promise<Group> {
  const { id, ...payload } = data;
  const response = await axiosInstance.put(`/group/${id}/`, payload);
  return response.data.data;
}

export async function updateGroupProfilePicture(
  data: FormData,
): Promise<Group> {
  const id = data.get("id");
  data.delete("id");
  const response = await axiosInstance.patch(
    `/group/profile-image/${id}/`,
    data,
  );
  return response.data.data;
}

export async function deleteGroup(groupId: number) {
  const response = await axiosInstance.delete(`/group/${groupId}/`);
  return response.data.data;
}

export async function leaveGroup(groupId: number) {
  const response = await axiosInstance.post(`/group/leave/${groupId}/`);
  return response.data.data;
}

export async function removeMember(data: { groupId: number; userId: number }) {
  const { groupId, userId } = data;
  const resonse = await axiosInstance.post(
    `/group/${groupId}/remove/user/${userId}/`,
  );
  return resonse.data.data;
}

export async function isUserJoined(group: string): Promise<boolean> {
  const response = await axiosInstance.get(`/group/user/${group}/`);

  return response.data.data === true;
}