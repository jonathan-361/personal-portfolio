import { create } from "zustand";
import type {
  Achievement,
  Pagination,
  AdminAchievement,
} from "@/modules/achievements/models/achievement.model";
import { achievementService } from "@/modules/core/services/achievement-services/achievement.services";

interface StorePagination extends Pagination {
  Total: number;
}

interface AchievementState {
  achievements: Achievement[];
  adminData: AdminAchievement[];
  pagination: StorePagination | null;
  isLoading: boolean;
  fetchAchievements: (email?: string) => Promise<void>;
  fetchMyAchievements: () => Promise<void>;
  addAchievement: (achievement: Achievement) => void;
  updateAchievementInStore: (
    id: number,
    updatedData: Partial<Achievement>,
  ) => void;
  removeAchievementFromStore: (id: number) => void;
}

export const useAchievementStore = create<AchievementState>((set) => ({
  achievements: [],
  adminData: [],
  pagination: null,
  isLoading: false,

  fetchAchievements: async (email?: string) => {
    set({ isLoading: true });
    try {
      const searchParam = email ? email.split("@")[0] : undefined;
      const response = await achievementService.getAll(searchParam);
      const extracted = response.data.map((item) => item.achievement);

      set({
        achievements: extracted,
        adminData: response.data,
        pagination: {
          ...response.pagination,
          Total: response.pagination.total,
        },
      });
    } catch (error) {
      console.error("Error fetching global achievements:", error);
      set({ achievements: [], adminData: [], pagination: null });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMyAchievements: async () => {
    set({ isLoading: true });
    try {
      const data = await achievementService.getMyAchievements();
      set({
        achievements: data,
        adminData: [],
        pagination: null,
      });
    } catch (error) {
      console.error("Error fetching my achievements:", error);
      set({ achievements: [], pagination: null });
    } finally {
      set({ isLoading: false });
    }
  },

  addAchievement: (newAchievement) =>
    set((state) => ({
      achievements: [newAchievement, ...state.achievements],
    })),

  updateAchievementInStore: (id, updatedData) =>
    set((state) => ({
      achievements: state.achievements.map((ach) =>
        ach.id === id ? { ...ach, ...updatedData } : ach,
      ),
    })),

  removeAchievementFromStore: (id) =>
    set((state) => ({
      achievements: state.achievements.filter((ach) => ach.id !== id),
    })),
}));
