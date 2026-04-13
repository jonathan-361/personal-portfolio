export type TaskStatus = "PENDIENTE" | "EN PROCESO" | "COMPLETADO";

export interface Task {
  id: number;
  title: string;
  description: string | null;
  user_id?: number;
  task_date: string;
  in_progress: TaskStatus;
  created_at: string;
  updated_at: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminTask {
  task: Task;
  user: User;
}

export interface User {
  id: number;
  names: string;
  first_last_name: string;
  second_last_name: string;
  email: string;
}

export interface TaskResponse {
  data: AdminTask[];
  pagination: Pagination;
}

export interface TaskMessageResponse {
  message: string;
}
