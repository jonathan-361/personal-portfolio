import { create } from "zustand";
import type {
  Task,
  Pagination,
  AdminTask,
} from "@/modules/tasks/models/task.model";
import { taskService } from "@/modules/core/services/task-services/task.services";

interface StorePagination extends Pagination {
  Total: number;
}

interface TaskState {
  tasks: Task[];
  adminData: AdminTask[];
  pagination: StorePagination | null;
  isLoading: boolean;
  fetchTasks: (email?: string) => Promise<void>;
  fetchMyTasks: () => Promise<void>;
  updateTaskStatus: (id: number, status: Task["in_progress"]) => Promise<void>;
  updateTaskInStore: (id: number, updatedFields: Partial<Task>) => void;
  addTask: (task: Task) => void;
  removeTaskFromStore: (id: number) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  adminData: [],
  pagination: null,
  isLoading: false,

  fetchTasks: async (email?: string) => {
    set({ isLoading: true });
    try {
      const searchParam = email ? email.split("@")[0] : undefined;
      const response = await taskService.getAll(searchParam);
      const extractedTasks = response.data.map((item) => item.task);

      set({
        tasks: extractedTasks,
        adminData: response.data,
        pagination: {
          ...response.pagination,
          Total: response.pagination.total,
        },
      });
    } catch (error) {
      console.error("Error al obtener tareas globales:", error);
      set({ tasks: [], adminData: [], pagination: null });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMyTasks: async () => {
    set({ isLoading: true });
    try {
      const data = await taskService.getMyTasks();
      set({
        tasks: data,
        adminData: [],
        pagination: null,
      });
    } catch (error) {
      console.error("Error al obtener mis tareas:", error);
      set({ tasks: [], pagination: null });
    } finally {
      set({ isLoading: false });
    }
  },

  addTask: (newTask) => set((state) => ({ tasks: [newTask, ...state.tasks] })),

  updateTaskInStore: (id, updatedFields) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, ...updatedFields } : t,
      ),
    })),

  updateTaskStatus: async (id, status) => {
    try {
      await taskService.update(id, { in_progress: status } as any);
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t.id === id ? { ...t, in_progress: status } : t,
        ),
      }));
    } catch (error) {
      console.error("Error al actualizar estado de tarea:", error);
    }
  },

  removeTaskFromStore: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));
