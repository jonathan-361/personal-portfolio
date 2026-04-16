import { z } from "zod";

const ACHIEVEMENT_TYPES = ["ACADEMICO", "PERSONAL", "PROFESIONAL"] as const;

export const achievementSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "El título es obligatorio")
    .max(60, "El título no puede exceder los 150 caracteres"),

  description: z
    .string()
    .trim()
    .min(1, "La descripción es obligatoria")
    .max(300, "La descripción es demasiado larga (máximo 500 caracteres)"),

  achieved_at: z
    .string()
    .min(1, "Debes seleccionar una fecha")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (AAAA-MM-DD)"),

  achievement_type: z.enum(ACHIEVEMENT_TYPES, {
    error: "Selecciona un tipo de logro válido",
  }),
});

export type AchievementFormData = z.infer<typeof achievementSchema>;
