import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "El título es obligatorio").max(150),
  description: z.string().optional(),
  task_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
  in_progress: z.enum(["PENDIENTE", "EN PROCESO", "COMPLETADO"]),
});

export type TaskFormData = z.infer<typeof taskSchema>;
