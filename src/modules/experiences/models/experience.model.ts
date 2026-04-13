export interface Experience {
  id: number;
  company: string;
  position: string;
  description: string;
  user_id?: number;
  start_date: string;
  end_date: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminExperience {
  experience: Experience;
  user: User;
}

export interface User {
  id: number;
  names: string;
  first_last_name: string;
  second_last_name: string;
  email: string;
}

export interface ExperienceResponse {
  data: AdminExperience[];
  pagination: Pagination;
}

export interface ExperienceMessageResponse {
  message: string;
}
