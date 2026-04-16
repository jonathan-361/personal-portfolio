export type NoteType = "NOTA" | "APUNTE" | "";

//Respuesta para /notes/me
export interface Note {
  id: number;
  title: string;
  content: string;
  user_id?: number;
  note_type: NoteType;
  created_at: string;
  updated_at: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminNote {
  content: Note;
  user: AdminUser;
}

export interface AdminUser {
  id: number;
  names: string;
  first_last_name: string;
  second_last_name: string;
  email: string;
}

// Respuesta para /notes
export interface NoteResponse {
  data: AdminNote[];
  pagination: Pagination;
}

export interface NoteMessageResponse {
  message: string;
}
