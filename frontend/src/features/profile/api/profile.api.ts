import axiosInstance from "@/lib/axios";
import type { User } from "../types/profile.types";
import type {
  ChangePasswordSchema,
  UpdateUserForm,
} from "../schema/user.schema";

export async function getUserProfile(): Promise<User> {
  const response = await axiosInstance.get(`/user/`);
  return response.data.data;
}

export async function updateUserProfile(data: UpdateUserForm): Promise<User> {
  const response = await axiosInstance.put("/user/", data);
  return response.data.data;
}

export async function deleteUserProfile() {
  const response = await axiosInstance.delete("/user/");
  return response.data.message;
}

export async function updateProfilePicture(data: FormData) {
  const response = await axiosInstance.patch("/user/profile-image/", data);
  return response.data.data;
}

export async function updatePassword(data: ChangePasswordSchema) {
  const payload = {
    password: data.password,
  };
  const response = await axiosInstance.patch("/user/change-password/", payload);
  return response.data.data;
}
