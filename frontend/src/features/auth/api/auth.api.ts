import axiosInstance from "@/lib/axios";
import type { LoginSchemaType } from "../schema/login.schema";
import type { SignupFormPayload } from "../schema/signup.schema";
import type { UserContextState } from "@/contexts/user/user.context";
import type { APIResponse } from "@/lib/types";
import { AxiosError } from "axios";

export async function signup(data: SignupFormPayload) {
  const response = await axiosInstance.post("/auth/signup/", data);
  return response.data;
}

export async function login(data: LoginSchemaType) {
  try {
    const response = await axiosInstance.post<APIResponse<null>>(
      "/auth/login/",
      data,
    );
    return response.data.message;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.errors.detail, { cause: error });
    }
    throw new Error("Something went wrong!", { cause: error });
  }
}

export async function getUser(): Promise<
  UserContextState & { isAuthenticated: boolean }
> {
  try {
    const response =
      await axiosInstance.get<APIResponse<UserContextState>>("/auth/verify/");
    return {
      ...response.data.data,
      isAuthenticated: true,
    };
  } catch {
    return { id: NaN, name: "", isAuthenticated: false };
  }
}

export async function logout() {
  const response = await axiosInstance.post("/auth/logout/");
  return response.data;
}
