import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email("Debe ser un correo válido").trim().regex(/^\S+$/, {
    message: "No se permiten espacios",
  }),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
