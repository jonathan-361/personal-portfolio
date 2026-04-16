import {
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  AxiosError,
} from "axios";

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("auth_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

export const requestErrorInterceptor = (error: any) => {
  return Promise.reject(error);
};

export const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

export const responseErrorInterceptor = (error: AxiosError) => {
  if (error.response?.status === 401) {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    localStorage.removeItem("user-storage");
    localStorage.removeItem("sidebar-storage");

    window.dispatchEvent(new Event("auth:logout"));
  }
  return Promise.reject(error);
};
