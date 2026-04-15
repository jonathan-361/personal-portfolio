import { api } from "@/modules/core/services/axios.instance";
import type {
  Experience,
  ExperienceResponse,
  ExperienceMessageResponse,
} from "@/modules/experiences/models/experience.model";
import type { ExperienceFormData } from "@/modules/experiences/schemas/experiences.schema";

export const experienceService = {
  // Obtener mis experiencias
  getMyExperiences: async (): Promise<Experience[]> => {
    return await api.get<Experience[]>("/experiences/me");
  },

  // Obtener experiencias (ADMIN)
  getAll: async (
    searchEmail?: string,
    signal?: AbortSignal,
  ): Promise<ExperienceResponse> => {
    return await api.get<ExperienceResponse>("/experiences", {
      signal,
      params: { searchEmail },
    });
  },

  // Crear una nueva experiencia
  create: async (data: ExperienceFormData): Promise<Experience> => {
    return await api.post<Experience>("/experiences/create", data);
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
