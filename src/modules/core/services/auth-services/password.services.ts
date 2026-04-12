// @/modules/core/services/auth-services/password.services.ts
import { api } from "@/modules/core/services/axios.instance";
import type { ForgotPasswordFormData } from "@/modules/auth/schemas/forgot.password";
import type { ResetPasswordFormData } from "@/modules/auth/schemas/reset.password";
import type { ChangePasswordResponse } from "@/modules/auth/models/auth.model";

export const passwordService = {
  // Envía el correo para obtener el código
  forgotPassword: async (
    data: ForgotPasswordFormData,
    signal?: AbortSignal,
  ): Promise<ChangePasswordResponse> => {
    return await api.post<ChangePasswordResponse>(
      "/auth/forgot-password",
      data,
      { signal },
    );
  },

  // Cambiar la contraseña
  resetPassword: async (
    data: ResetPasswordFormData,
    signal?: AbortSignal,
  ): Promise<ChangePasswordResponse> => {
    return await api.patch<ChangePasswordResponse>(
      "/auth/reset-password",
      data,
      { signal },
    );
  },
};
