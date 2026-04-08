import { api } from "@/modules/core/services/axios.instance";
import type { ForgotPasswordFormData } from "@/modules/auth/schemas/forgot_password";
import type { ResetPasswordFormData } from "@/modules/auth/schemas/reset_password";
import type { ChangePasswordResponse } from "@/modules/auth/models/auth.model";

export const passwordService = {
  /**
   * Solicitar código de verificación al correo
   */
  forgotPassword: async (
    data: ForgotPasswordFormData,
  ): Promise<ChangePasswordResponse> => {
    return await api.post<ChangePasswordResponse>(
      "/auth/forgot-password",
      data,
    );
  },

  /**
   * Resetear la contraseña con el código recibido
   */
  resetPassword: async (
    data: ResetPasswordFormData,
  ): Promise<ChangePasswordResponse> => {
    return await api.patch<ChangePasswordResponse>(
      "/auth/reset-password",
      data,
    );
  },
};
