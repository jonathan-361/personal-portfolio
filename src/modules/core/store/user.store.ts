import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User, Pagination } from "@/modules/home/models/user.model";

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;

  usersList: User[];
  pagination: Pagination | null;
  setUsersData: (data: User[], pagination: Pagination) => void;

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
