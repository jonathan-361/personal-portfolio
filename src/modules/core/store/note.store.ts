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
  fetchNotes: (email?: string) => Promise<void>;
  fetchMyNotes: () => Promise<void>;
  addNoteToStore: (note: Note) => void;
  updateNoteInStore: (id: number, updatedFields: Partial<Note>) => void;
  removeNoteFromStore: (id: number) => void;
}

export const useNoteStore = create<NoteState>((set) => ({
  notes: [],
  adminData: [],
  pagination: null,
  isLoading: false,

  fetchNotes: async (email?: string) => {
    set({ isLoading: true });
    try {
      const searchParam = email ? email.split("@")[0] : undefined;
      const firstResponse = await noteService.getAll(searchParam, 1);

      let cumulativeAdminData = [...firstResponse.data];
      const { totalPages } = firstResponse.pagination;
      if (totalPages > 1) {
        const pagePromises = [];
        for (let i = 2; i <= totalPages; i++) {
          pagePromises.push(noteService.getAll(searchParam, i));
        }

        const additionalResponses = await Promise.all(pagePromises);
        additionalResponses.forEach((res) => {
          cumulativeAdminData = [...cumulativeAdminData, ...res.data];
        });
      }

      const extractedNotes = cumulativeAdminData.map((item) => item.content);

      set({
        notes: extractedNotes,
        adminData: cumulativeAdminData,
        pagination: {
          ...firstResponse.pagination,
          totalPages: 1,
        },
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

  addNoteToStore: (newNote) =>
    set((state) => ({
      notes: [newNote, ...state.notes],
    })),

  updateNoteInStore: (id, updatedFields) =>
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === id ? { ...n, ...updatedFields } : n,
      ),
      adminData: state.adminData.map((item) =>
        item.content.id === id
          ? { ...item, content: { ...item.content, ...updatedFields } }
          : item,
      ),
    })),

  removeNoteFromStore: (id) =>
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
      adminData: state.adminData.filter((item) => item.content.id !== id),
    })),
}));
