export interface User {
  id: string;
  names: string;
  first_lastname: string;
  second_lastname: string;
  email: string;
  name: string;
  role?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterResponse {
  user: User;
}
