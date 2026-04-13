import { api } from "@/modules/core/services/axios.instance";
import type { NoteResponse } from "@/modules/notes/models/note.model";

export const noteService = {
  // Traer todos los usuarios
  getAll: async (): Promise<NoteResponse[]> => {
    return await api.get<NoteResponse[]>("/notes");
  },
};
