import { create } from "zustand";
import type {
  Note,
  Pagination,
  AdminNote,
} from "@/modules/notes/models/note.model";
import { noteService } from "@/modules/core/services/note-services/note.services";

interface NoteState {
  notes: Note[];
  adminData: AdminNote[];
  pagination: Pagination | null;
  isLoading: boolean;
  fetchNotes: () => Promise<void>;
  fetchMyNotes: () => Promise<void>;
}

export const useNoteStore = create<NoteState>((set) => ({
  notes: [],
  adminData: [],
  pagination: null,
  isLoading: false,

  fetchNotes: async () => {
    set({ isLoading: true });
    try {
      const response = await noteService.getAll();

      const extractedNotes = response.data.map((item) => item.content);

      set({
        notes: extractedNotes,
        adminData: response.data,
        pagination: response.pagination,
      });
    } catch (error) {
      console.error("Error al obtener todas las notas:", error);
      set({ notes: [], adminData: [], pagination: null });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMyNotes: async () => {
    set({ isLoading: true });
    try {
      const data = await noteService.getMyNotes();
      set({
        notes: data,
        adminData: [],
        pagination: null,
      });
    } catch (error) {
      console.error("Error al obtener mis notas:", error);
      set({ notes: [], adminData: [], pagination: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));
