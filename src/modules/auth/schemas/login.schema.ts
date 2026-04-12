import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Debe ser un correo válido").regex(/^\S+$/, {
    message: "No se permiten espacios",
  }),

  password: z
    .string()
    .min(8, "Mínimo 8 caracteres")
    .max(30, "Máximo 30 caracteres")
    .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
    .regex(/[0-9]/, "Debe tener al menos un número"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
