import { api } from "@/modules/core/services/axios.instance";
import type {
  Note,
  NoteResponse,
  NoteMessageResponse,
} from "@/modules/notes/models/note.model";

export const noteService = {
  // Obtener mis notas
  getMyNotes: async (): Promise<Note[]> => {
    return await api.get<Note[]>("/notes/me");
  },

  // Obtener notas (ADMIN)
  getAll: async (): Promise<NoteResponse> => {
    return await api.get<NoteResponse>("/notes");
  },

  // Agregar nota
  create: async (
    data: Omit<Note, "id" | "created_at" | "updated_at" | "user_id">,
  ): Promise<Note> => {
    return await api.post<Note>("/notes/create", data);
  },

  // Actualizar nota por ID
  update: async (
    id: number,
    data: Partial<Note>,
  ): Promise<NoteMessageResponse> => {
    return await api.patch<NoteMessageResponse>(`/notes/${id}`, data);
  },

  // Eliminar nota por ID
  delete: async (id: number): Promise<NoteMessageResponse> => {
    return await api.delete<NoteMessageResponse>(`/notes/${id}`);
  },
};
