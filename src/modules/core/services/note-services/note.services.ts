import { api } from "@/modules/core/services/axios.instance";
import type { NoteResponse } from "@/modules/notes/models/note.model";

export const noteService = {
  // Traer mis notas
  getMyNotes: async (): Promise<NoteResponse[]> => {
    return await api.get<NoteResponse[]>("/notes/me");
  },

  // Traer notas de todos los usuarios
  getAll: async (): Promise<NoteResponse[]> => {
    return await api.get<NoteResponse[]>("/notes");
  },
};
