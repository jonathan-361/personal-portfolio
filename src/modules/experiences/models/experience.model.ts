export interface ExperienceResponse {
  id: number;
  company: string;
  position: string;
  description: string;
  user_id: number;
  start_date: string;
  end_date: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ExperienceMessageResponse {
  message: string;
}
