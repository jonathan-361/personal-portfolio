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
      const firstResponse = await achievementService.getAll(searchParam, 1);
      let allAdminData = [...firstResponse.data];
      const { totalPages } = firstResponse.pagination;

      if (totalPages > 1) {
        const remainingPagesPromises = [];
        for (let i = 2; i <= totalPages; i++) {
          remainingPagesPromises.push(
            achievementService.getAll(searchParam, i),
          );
        }

        const results = await Promise.all(remainingPagesPromises);
        results.forEach((res) => {
          allAdminData = [...allAdminData, ...res.data];
        });
      }
      const extracted = allAdminData.map((item) => item.achievement);

      set({
        achievements: extracted,
        adminData: allAdminData,
        pagination: {
          ...firstResponse.pagination,
          total: allAdminData.length,
          Total: allAdminData.length,
          totalPages: 1,
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
