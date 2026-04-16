import { z } from "zod";

export const noteSchema = z.object({
  title: z
    .string()
    .min(1, "El título es requerido")
    .max(150, "Título demasiado largo"),
  content: z.string().min(1, "El contenido no puede estar vacío"),
  note_type: z.enum(["NOTA", "APUNTE"]).default("NOTA"),
});

export type NoteFormData = z.infer<typeof noteSchema>;
