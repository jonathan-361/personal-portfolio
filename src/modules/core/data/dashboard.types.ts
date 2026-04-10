export interface User {
  id: number;
  first_name: string;
  last_name: string;
  second_last_name: string;
  email: string;
  role: "ADMIN" | "USER";
  created_at: string;
}

export interface Note {
  id: number;
  title: string;
  content: string | null;
  type: "Apunte" | "Nota";
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string | null;
  user_id: number;
  achieved_at: string | null;
  created_at: string;
}

export interface Task {
  id: number;
  title: string;
  description: string | null;
  user_id: number;
  task_date: string | null;
  created_at: string;
}

export interface Experience {
  id: number;
  company: string | null;
  position: string | null;
  description: string | null;
  user_id: number;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
}
