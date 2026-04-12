import { create } from "zustand";
import type { TaskResponse } from "@/modules/tasks/models/task.model";
import { taskService } from "@/modules/core/services/task-services/task.services";

interface TaskState {
  tasks: TaskResponse[];
  isLoading: boolean;
  fetchTasks: () => Promise<void>;
  addTask: (task: TaskResponse) => void;
  updateTaskStatus: (
    id: number,
    status: TaskResponse["in_progress"],
  ) => Promise<void>;
  updateTaskInStore: (id: number, updatedData: Partial<TaskResponse>) => void;
  removeTaskFromStore: (id: number) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  isLoading: false,

  fetchTasks: async () => {
    set({ isLoading: true });
    try {
      const data = await taskService.getAll();
      set({ tasks: data });
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateTaskStatus: async (id, status) => {
    try {
      // 1. Llamada a la API
      await taskService.update(id, { in_progress: status } as any);
      // 2. Actualización local del Store
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t.id === id ? { ...t, in_progress: status } : t,
        ),
      }));
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  },

  addTask: (newTask) => set((state) => ({ tasks: [newTask, ...state.tasks] })),

  updateTaskInStore: (id, updatedData) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedData } : task,
      ),
    })),

  removeTaskFromStore: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));
