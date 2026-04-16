import type { ResetPasswordFormData } from "@/modules/auth/schemas/reset.password";
// Importamos el User real
import type { User } from "@/modules/home/models/user.model";

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterResponse {
  user: User;
}

export interface ChangePasswordResponse {
  message: string;
}

export interface ResetPasswordPayload extends ResetPasswordFormData {}
