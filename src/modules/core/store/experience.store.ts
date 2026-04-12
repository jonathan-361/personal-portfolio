import { create } from "zustand";
import type { ExperienceResponse } from "@/modules/experiences/models/experience.model";
import { experienceService } from "@/modules/core/services/experience-services/experience.services";
import type { ExperienceFormData } from "@/modules/experiences/schemas/experiences.schema";

interface ExperienceState {
  experiences: ExperienceResponse[];
  isLoading: boolean;

  fetchExperiences: (signal?: AbortSignal) => Promise<void>;
  addExperience: (data: ExperienceFormData) => Promise<void>;
  updateExperienceInStore: (
    id: number,
    data: Partial<ExperienceFormData>,
  ) => Promise<void>;
  removeExperienceFromStore: (id: number) => Promise<void>;
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  experiences: [],
  isLoading: false,

  fetchExperiences: async (signal) => {
    set({ isLoading: true });
    try {
      const data = await experienceService.getAll(signal);
      set({ experiences: data });
    } catch (error) {
      console.error("Error fetching experiences:", error);
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
