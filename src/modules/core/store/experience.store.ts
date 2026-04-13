import { create } from "zustand";
import type {
  Experience,
  Pagination,
  AdminExperience,
} from "@/modules/experiences/models/experience.model";
import { experienceService } from "@/modules/core/services/experience-services/experience.services";
import type { ExperienceFormData } from "@/modules/experiences/schemas/experiences.schema";

interface StorePagination extends Pagination {
  Total: number;
}

interface ExperienceState {
  experiences: Experience[];
  adminData: AdminExperience[];
  pagination: StorePagination | null;
  isLoading: boolean;

  fetchExperiences: (signal?: AbortSignal) => Promise<void>;
  fetchMyExperiences: () => Promise<void>;
  addExperience: (data: ExperienceFormData) => Promise<void>;
  updateExperienceInStore: (
    id: number,
    data: Partial<ExperienceFormData>,
  ) => Promise<void>;
  removeExperienceFromStore: (id: number) => Promise<void>;
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  experiences: [],
  adminData: [],
  pagination: null,
  isLoading: false,

  // Para Administrador
  fetchExperiences: async (signal) => {
    set({ isLoading: true });
    try {
      const response = await experienceService.getAll(signal);
      const extracted = response.data.map((item) => item.experience);

      set({
        experiences: extracted,
        adminData: response.data,
        pagination: {
          ...response.pagination,
          Total: response.pagination.total, // Mapeo para el Dashboard
        },
      });
    } catch (error) {
      if (error instanceof Error && error.name === "CanceledError") return;
      console.error("Error fetching global experiences:", error);
      set({ experiences: [], adminData: [], pagination: null });
    } finally {
      set({ isLoading: false });
    }
  },

  // Para Usuario Normal
  fetchMyExperiences: async () => {
    set({ isLoading: true });
    try {
      const data = await experienceService.getMyExperiences();
      set({
        experiences: data,
        adminData: [],
        pagination: null,
      });
    } catch (error) {
      console.error("Error fetching my experiences:", error);
      set({ experiences: [], pagination: null });
    } finally {
      set({ isLoading: false });
    }
  },

  addExperience: async (data) => {
    try {
      const newExperience = await experienceService.create(data);
      set((state) => ({
        experiences: [newExperience, ...state.experiences],
      }));
    } catch (error) {
      console.error("Error adding experience:", error);
      throw error;
    }
  },

  updateExperienceInStore: async (id, updatedData) => {
    set({ isLoading: true });
    try {
      await experienceService.update(id, updatedData);
      set((state) => ({
        experiences: state.experiences.map((exp) =>
          exp.id === id ? { ...exp, ...updatedData } : exp,
        ),
      }));
    } catch (error) {
      console.error("Error updating experience:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  removeExperienceFromStore: async (id) => {
    set({ isLoading: true });
    try {
      await experienceService.delete(id);
      set((state) => ({
        experiences: state.experiences.filter((exp) => exp.id !== id),
      }));
    } catch (error) {
      console.error("Error removing experience:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
