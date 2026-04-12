import { z } from "zod";

export const registerSchema = z
  .object({
    names: z
      .string()
      .max(30, "Máximo 30 caracteres")
      .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
        message: "Solo se permiten letras y espacios",
      }),

    first_last_name: z
      .string()
      .trim()
      .min(1, "No dejes el campo vacío")
      .max(50, "Máximo 50 caracteres")
      .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
        message: "Solo se permiten letras y espacios",
      })
      .regex(/^\S+$/, {
        message: "No se permiten espacios",
      }),

    second_last_name: z
      .string()
      .trim()
      .min(1, "No dejes el campo vacío")
      .min(2, "Mínimo 2 caracteres")
      .max(50, "Máximo 50 caracteres")
      .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
        message: "Solo se permiten letras y espacios",
      })
      .regex(/^\S+$/, {
        message: "No se permiten espacios",
      }),

    email: z.email("Debe ser un correo válido").regex(/^\S+$/, {
      message: "No se permiten espacios",
    }),

    password: z
      .string()
      .min(1, { message: "No dejes el campo vacío" })
      .min(8, "Mínimo 8 caracteres")
      .max(30, "Máximo 30 caracteres")
      .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
      .regex(/[0-9]/, "Debe tener al menos un número"),

    repeat_password: z.string(),
  })
  .refine((data) => data.password === data.repeat_password, {
    message: "Las contraseñas no coindicen",
    path: ["repeat_password"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
