import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    token: z
      .string()
      .length(6, "El código debe tener exactamente 6 dígitos")
      .regex(/^[0-9]+$/, "El código solo debe contener números"),

    newPassword: z
      .string()
      .min(8, "Mínimo 8 caracteres")
      .max(30, "Máximo 30 caracteres")
      .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
      .regex(/[0-9]/, "Debe tener al menos un número"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coindicen",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
