import { api } from "@/modules/core/services/axios.instance";
import type { LoginFormData } from "@/modules/auth/schemas/login_schema";
import type { RegisterFormData } from "@/modules/auth/schemas/register_schema";
import type {
  LoginResponse,
  RegisterResponse,
} from "@/modules/auth/models/auth.model";

export const authService = {
  /**
   * Petición de Login
   * @param data - Datos validados por loginSchema
   */
  login: async (data: LoginFormData): Promise<LoginResponse> => {
    return await api.post<LoginResponse>("/auth/login", data);
  },

  /**
   * Petición de Registro
   * @param data - Datos validados por registerSchema
   */
  register: async (data: RegisterFormData): Promise<RegisterResponse> => {
    const { repeat_password, ...dataToSend } = data;
    return await api.post<RegisterResponse>("/auth/register", dataToSend);
  },

  /**
   * Utilidad para persistir el token manualmente si fuera necesario
   */
  saveToken: (token: string) => {
    localStorage.setItem("auth_token", token);
  },

  logout: () => {
    localStorage.removeItem("auth_token");
  },
};
