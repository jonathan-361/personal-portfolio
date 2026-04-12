import { z } from "zod";

export const experienceSchema = z.object({
  company: z.string().min(1, "La empresa es obligatoria").max(120),
  position: z.string().min(1, "El cargo es obligatorio").max(100),
  description: z.string().min(1, "La descripción es obligatoria"),
  start_date: z.string().min(1, "La fecha de inicio es obligatoria"),
  end_date: z.string().nullable().optional().or(z.literal("")),
});

export type ExperienceFormData = z.infer<typeof experienceSchema>;
