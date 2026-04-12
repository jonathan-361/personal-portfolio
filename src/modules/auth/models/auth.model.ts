import type { ResetPasswordFormData } from "../schemas/reset.password";

export interface User {
  id: string;
  names: string;
  first_last_name: string;
  second_last_name: string;
  email: string;
  role?: string;
}

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
