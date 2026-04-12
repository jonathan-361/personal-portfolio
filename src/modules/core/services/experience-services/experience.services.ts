import { api } from "@/modules/core/services/axios.instance";
import type {
  ExperienceResponse,
  ExperienceMessageResponse,
} from "@/modules/experiences/models/experience.model";
import type { ExperienceFormData } from "@/modules/experiences/schemas/experiences.schema";

export const experienceService = {
  // Obtener todas las experiencias
  getAll: async (signal?: AbortSignal): Promise<ExperienceResponse[]> => {
    return await api.get<ExperienceResponse[]>("/experiences", { signal });
  },

  // Crear una nueva experiencia
  create: async (data: ExperienceFormData): Promise<ExperienceResponse> => {
    return await api.post<ExperienceResponse>("/experiences", data);
  },

  // Actualizar experiencia por ID
  update: async (
    id: number,
    data: Partial<ExperienceFormData>,
  ): Promise<ExperienceMessageResponse> => {
    return await api.patch<ExperienceMessageResponse>(
      `/experiences/${id}`,
      data,
    );
  },

  // Eliminar experiencia por ID
  delete: async (id: number): Promise<ExperienceMessageResponse> => {
    return await api.delete<ExperienceMessageResponse>(`/experiences/${id}`);
  },
};
