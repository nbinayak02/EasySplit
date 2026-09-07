import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export interface FailedRequestQueueItem {
  resolve: (value?: AxiosResponse) => void;
  reject: (error?: AxiosError) => void;
  config: AxiosRequestConfig;
}

type Meta = {
  count: number;
  next: number | null;
  previous: number | null;
};

export type APIResponse<T> = {
  status: true;
  message: string;
  data: T;
  meta: Meta;
};

export type APIErrorResponse = {
  status: boolean;
  message: string;
  errors: Record<string, string>;
};
