import { api } from "@/modules/core/services/axios.instance";
import type {
  User,
  UsersResponse,
  UpdateUserDto,
} from "@/modules/home/models/user.model";

export const userService = {
  // Obtener la información del propio usuario
  getMe: async (signal?: AbortSignal): Promise<User> => {
    return await api.get<User>("/users/me", { signal });
  },

  // Obtener todos los usuarios (ADMIN)
  getAll: async (
    role?: string,
    signal?: AbortSignal,
  ): Promise<UsersResponse> => {
    const url = role ? `/users?role=${role}` : "/users";
    return await api.get<UsersResponse>(url, { signal });
  },

  // Actualizar datos del usuario
  update: async (
    data: UpdateUserDto,
  ): Promise<{ message: string; user: User }> => {
    return await api.patch<{ message: string; user: User }>(`/users/me`, data);
  },

  // Eliminar mi propio usuario
  deleteAccount: async (): Promise<{ message: string }> => {
    return await api.delete<{ message: string }>("/users/me");
  },

  // Eliminar usuario
  deleteById: async (id: number): Promise<{ message: string }> => {
    return await api.delete<{ message: string }>(`/users/${id}`);
  },
};
