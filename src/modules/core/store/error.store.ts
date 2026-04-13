import { create } from "zustand";

interface ErrorState {
  statusCode: number | null;
  setErrorCode: (code: number | null) => void;
  clearError: () => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
  statusCode: null,
  setErrorCode: (code) => set({ statusCode: code }),
  clearError: () => set({ statusCode: null }),
}));
