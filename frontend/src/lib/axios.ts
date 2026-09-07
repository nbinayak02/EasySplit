import axios, { type AxiosRequestConfig } from "axios";
import type { FailedRequestQueueItem } from "./types";

const baseURL = import.meta.env.VITE_BASE_URL ?? "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  withCredentials: true,
});

let isRefreshing = false;
const failedRequestsQueue: FailedRequestQueueItem[] = [];

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const currentRequest: AxiosRequestConfig = error.config;
    const errorCode = error.response.data.error_code;

    if (
      error.response &&
      error.response.status === 401 &&
      errorCode === "TOKEN_EXPIRED"
    ) {
      // if not any req is refreshing
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          await axios.post(
            `${baseURL}/auth/refresh/`,
            {},
            {
              withCredentials: true,
            },
          );

          // retry failed requests
          failedRequestsQueue.forEach(({ config, resolve, reject }) => {
            axiosInstance
              .request(config)
              .then((response) => resolve(response))
              .catch((error) => reject(error));
          });

          // clear queue
          failedRequestsQueue.length = 0;

          // retry current refreshing request
          return axiosInstance.request(currentRequest);
        } catch (error) {
          window.location.replace("/login");
          return Promise.reject(error);
        } finally {
          // refreshing completed
          isRefreshing = false;
        }
      }

      // if other request is refreshing push current request to failed queue.
      // we need resolve and reject later for resolving or rejecting this request
      // axios interceptor expects promise to be returned
      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({ config: currentRequest, resolve, reject });
      });
    }

    // if not token expire error
    return Promise.reject(error?.response?.data ?? error);
  },
);

export default axiosInstance;
