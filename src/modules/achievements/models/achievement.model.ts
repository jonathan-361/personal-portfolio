export type AchievementType = "ACADEMICO" | "PERSONAL" | "PROFESIONAL";

export interface AchievementResponse {
  id: number;
  title: string;
  description: string;
  user_id: number;
  achieved_at: string;
  achievement_type: AchievementType;
  created_at?: string;
  updated_at?: string;
}

export interface AchievementMessageResponse {
  message: string;
}
