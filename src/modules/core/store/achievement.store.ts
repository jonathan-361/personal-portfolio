import { create } from "zustand";
import type { AchievementResponse } from "@/modules/achievements/models/achievement.model";
import { achievementService } from "@/modules/core/services/achievement-services/achievement.services";

interface AchievementState {
  achievements: AchievementResponse[];
  isLoading: boolean;
  // Acciones
  fetchAchievements: () => Promise<void>;
  addAchievement: (achievement: AchievementResponse) => void;
  updateAchievementInStore: (
    id: number,
    updatedData: Partial<AchievementResponse>,
  ) => void;
  removeAchievementFromStore: (id: number) => void;
}

export const useAchievementStore = create<AchievementState>((set) => ({
  achievements: [],
  isLoading: false,

  // Obtener todos los logros
  fetchAchievements: async () => {
    set({ isLoading: true });
    try {
      const data = await achievementService.getAll();
      set({ achievements: data });
    } catch (error) {
      console.error("Error fetching achievements:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Agregar nuevo logro
  addAchievement: (newAchievement) =>
    set((state) => ({
      achievements: [newAchievement, ...state.achievements],
    })),

  // Actualizar un logro
  updateAchievementInStore: (id, updatedData) =>
    set((state) => ({
      achievements: state.achievements.map((ach) =>
        ach.id === id ? { ...ach, ...updatedData } : ach,
      ),
    })),

  // Eliminar un logro
  removeAchievementFromStore: (id) =>
    set((state) => ({
      achievements: state.achievements.filter((ach) => ach.id !== id),
    })),
}));
