import { api } from "@/modules/core/services/axios.instance";
import type { Note, NoteResponse } from "@/modules/notes/models/note.model";

export const noteService = {
  // Obtener mis notas
  getMyNotes: async (): Promise<Note[]> => {
    return await api.get<Note[]>("/notes/me");
  },

  // Obtener notas (ADMIN)
  getAll: async (): Promise<NoteResponse> => {
    return await api.get<NoteResponse>("/notes");
  },
};
