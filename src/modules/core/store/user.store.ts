import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User, Pagination } from "@/modules/home/models/user.model";
import { userService } from "@/modules/core/services/user-services/user.services";

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;

  usersList: User[];
  pagination: Pagination | null;
  setUsersData: (data: User[], pagination: Pagination) => void;

  searchUsers: (email: string) => Promise<void>;

  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      usersList: [],
      pagination: null,

      setUser: (user) => set({ user }),

      setUsersData: (data, pagination) =>
        set({
          usersList: data,
          pagination,
        }),

      searchUsers: async (email: string) => {
        try {
          const query = email.split("@")[0];
          const response = await userService.getAll({ search: query });
          set({
            usersList: response.data,
            pagination: response.pagination,
          });
        } catch (error) {
          console.error("Error buscando usuario:", error);
          set({ usersList: [], pagination: null });
        }
      },

      clearUser: () =>
        set({
          user: null,
          usersList: [],
          pagination: null,
        }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({ user: state.user }),
    },
  ),
);
