import { api } from "@/modules/core/services/axios.instance";
// Usamos los nombres exactos de tus modelos e interfaces
import type {
  AchievementResponse,
  AchievementMessageResponse,
} from "@/modules/achievements/models/achievement.model";
import type { AchievementFormData } from "@/modules/achievements/schemas/achievement.schema";

export const achievementService = {
  // Obtener todos los logros (en caso de ser admin, trae de todos los usuarios)
  getAll: async (): Promise<AchievementResponse[]> => {
    return await api.get<AchievementResponse[]>("/achievements");
  },

  // Crear nuevo logro
  create: async (data: AchievementFormData): Promise<AchievementResponse> => {
    return await api.post<AchievementResponse>("/achievements", data);
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
