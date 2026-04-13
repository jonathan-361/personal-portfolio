import { create } from "zustand";
import type { NoteResponse } from "@/modules/notes/models/note.model";
import { noteService } from "@/modules/core/services/note-services/note.services";

interface NoteState {
  notes: NoteResponse[];
  isLoading: boolean;
  fetchNotes: () => Promise<void>;
}

export const useNoteStore = create<NoteState>((set) => ({
  notes: [],
  isLoading: false,

  fetchNotes: async () => {
    set({ isLoading: true });
    try {
      const data = await noteService.getAll();
      set({ notes: data });
    } catch (error) {
      console.error("Error al obtener notas:", error);
      set({ notes: [] });
    } finally {
      set({ isLoading: false });
    }
  },
}));
