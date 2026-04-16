import { api } from "@/modules/core/services/axios.instance";

import type {
  Achievement,
  AchievementResponse,
  AchievementMessageResponse,
} from "@/modules/achievements/models/achievement.model";
import type { AchievementFormData } from "@/modules/achievements/schemas/achievement.schema";

export const achievementService = {
  // Obtener mis logros
  getMyAchievements: async (): Promise<Achievement[]> => {
    return await api.get<Achievement[]>("/achievements/me");
  },

  // Obtener logros (ADMIN)
  getAll: async (
    searchEmail?: string,
    page: number = 1,
  ): Promise<AchievementResponse> => {
    return await api.get<AchievementResponse>("/achievements", {
      params: { searchEmail, page },
    });
  },

  // Crear nuevo logro
  create: async (data: AchievementFormData): Promise<Achievement> => {
    return await api.post<Achievement>("/achievements/create", data);
  },

  // Actualizar logro por ID
  update: async (
    id: number,
    data: Partial<AchievementFormData>,
  ): Promise<AchievementMessageResponse> => {
    return await api.patch<AchievementMessageResponse>(
      `/achievements/${id}`,
      data,
    );
  },

  // Eliminar logro por ID
  delete: async (id: number): Promise<AchievementMessageResponse> => {
    return await api.delete<AchievementMessageResponse>(`/achievements/${id}`);
  },
};
