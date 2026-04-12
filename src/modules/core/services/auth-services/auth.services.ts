import { api } from "@/modules/core/services/axios.instance";
import { useUserStore } from "@/modules/core/store/user.store";
import type { LoginFormData } from "@/modules/auth/schemas/login.schema";
import type { RegisterFormData } from "@/modules/auth/schemas/register.schema";
import type {
  LoginResponse,
  RegisterResponse,
} from "@/modules/auth/models/auth.model";

export const authService = {
  login: async (data: LoginFormData): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", data);

    if (response.token && response.user) {
      useUserStore.getState().setUser(response.user);
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("auth_user", JSON.stringify(response.user));
    }

    return response;
  },

  register: async (data: RegisterFormData): Promise<RegisterResponse> => {
    const { repeat_password, ...dataToSend } = data;
    return await api.post<RegisterResponse>("/auth/register", dataToSend);
  },

  logout: () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    useUserStore.getState().clearUser();

    if (!window.location.pathname.includes("/login")) {
      window.location.href = "/login";
    }
  },
};
