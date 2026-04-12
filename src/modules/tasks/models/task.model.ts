export interface TaskResponse {
  id: number;
  title: string;
  description: string | null;
  user_id: number;
  task_date: string;
  in_progress: "PENDIENTE" | "EN PROCESO" | "COMPLETADO";
  created_at: string;
  updated_at: string;
}

export interface TaskMessageResponse {
  message: string;
}
