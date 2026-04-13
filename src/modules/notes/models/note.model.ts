export type NoteType = "NOTA" | "APUNTE" | "";

export interface NoteResponse {
  id: number;
  title: string;
  content: string;
  user_id: number;
  note_type: NoteType;
  created_at: string;
  updated_at: string;
}

export interface NoteMessageResponse {
  message: string;
}
