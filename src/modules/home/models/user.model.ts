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

export interface Pagination {
  Total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UsersResponse {
  data: User[];
  pagination: Pagination;
}

export interface UpdateUserDto {
  names?: string;
  first_last_name?: string;
  second_last_name?: string;
  email?: string;
}
