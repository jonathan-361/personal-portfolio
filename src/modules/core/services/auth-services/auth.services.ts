// auth.services.ts
import { api } from "@/modules/core/services/axios.instance";
import type { LoginFormData } from "@/modules/auth/schemas/login.schema";
import type { RegisterFormData } from "@/modules/auth/schemas/register.schema";
import type {
  LoginResponse,
  RegisterResponse,
} from "@/modules/auth/models/auth.model";

export const authService = {
  login: async (data: LoginFormData): Promise<LoginResponse> => {
    return await api.post<LoginResponse>("/auth/login", data);
  },

  register: async (data: RegisterFormData): Promise<RegisterResponse> => {
    const { repeat_password, ...dataToSend } = data;
    return await api.post<RegisterResponse>("/auth/register", dataToSend);
  },

  saveToken: (token: string) => {
    localStorage.setItem("auth_token", token);
  },

  logout: () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  },
};
