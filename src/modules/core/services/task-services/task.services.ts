import { api } from "@/modules/core/services/axios.instance";
import type {
  TaskResponse,
  TaskMessageResponse,
} from "@/modules/tasks/models/task.model";
import type { TaskFormData } from "@/modules/tasks/schemas/task.schema";

export const taskService = {
  // Obtiene las tareas (En caso de ser admin, trae el de todos los usuarios)
  getAll: async (): Promise<TaskResponse[]> => {
    return await api.get<TaskResponse[]>("/tasks");
  },

  // Crea una nueva tarea
  create: async (data: TaskFormData): Promise<TaskResponse> => {
    return await api.post<TaskResponse>("/tasks", data);
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
