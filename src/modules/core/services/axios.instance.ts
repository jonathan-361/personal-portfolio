import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Interceptor de peticiones
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * Interceptor de respuestas
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Sesión expirada. Redirigiendo...");
    }
    return Promise.reject(error);
  },
);

export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.get<T>(url, config).then((res) => res.data),

  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosInstance.post<T>(url, data, config).then((res) => res.data),

  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosInstance.put<T>(url, data, config).then((res) => res.data),

  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosInstance.patch<T>(url, data, config).then((res) => res.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.delete<T>(url, config).then((res) => res.data),
};

export default axiosInstance;
