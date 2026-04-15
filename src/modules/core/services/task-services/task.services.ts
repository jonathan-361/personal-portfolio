import { api } from "@/modules/core/services/axios.instance";
import type {
  Task,
  TaskResponse,
  TaskMessageResponse,
} from "@/modules/tasks/models/task.model";
import type { TaskFormData } from "@/modules/tasks/schemas/task.schema";

export const taskService = {
  // Obtener mis tareas
  getMyTasks: async (): Promise<Task[]> => {
    return await api.get<Task[]>("/tasks/me");
  },

  // Obtener tareas (ADMIN)
  getAll: async (searchEmail?: string): Promise<TaskResponse> => {
    return await api.get<TaskResponse>("/tasks", { params: { searchEmail } });
  },

  // Crea una nueva tarea
  create: async (data: TaskFormData): Promise<Task> => {
    return await api.post<Task>("/tasks/create", data);
  },

  // Actualiza una tarea por id
  update: async (
    id: number,
    data: Partial<TaskFormData>,
  ): Promise<TaskMessageResponse> => {
    return await api.patch<TaskMessageResponse>(`/tasks/${id}`, data);
  },

  // Elimina una tarea por ID
  delete: async (id: number): Promise<TaskMessageResponse> => {
    return await api.delete<TaskMessageResponse>(`/tasks/${id}`);
  },
};
