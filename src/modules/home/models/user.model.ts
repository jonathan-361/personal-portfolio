export type UserRole = "USER" | "ADMIN";

export interface User {
  id: number;
  names: string;
  first_last_name: string;
  second_last_name: string;
  email: string;
  role: UserRole;
  profile_image_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface UsersResponse {
  data: User[];
}

export interface UpdateUserDto {
  names?: string;
  first_last_name?: string;
  second_last_name?: string;
  email?: string;
}
