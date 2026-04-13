export type AchievementType = "ACADEMICO" | "PERSONAL" | "PROFESIONAL";

export interface Achievement {
  id: number;
  title: string;
  description: string;
  user_id?: number;
  achieved_at: string;
  achievement_type: AchievementType;
  created_at?: string;
  updated_at?: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminAchievement {
  achievement: Achievement;
  user: User;
}

export interface User {
  id: number;
  names: string;
  first_last_name: string;
  second_last_name: string;
  email: string;
}

export interface AchievementResponse {
  data: AdminAchievement[];
  pagination: Pagination;
}

export interface AchievementMessageResponse {
  message: string;
}
