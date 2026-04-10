import { create } from "zustand";
import { tasksMock } from "@/modules/core/data/dashboard.data";
import type { Task, TaskStatus } from "@/modules/core/data/dashboard.types";

interface TaskState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  updateTaskStatus: (taskId: number, newStatus: TaskStatus) => void;
  addTask: (task: Omit<Task, "id" | "created_at">) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: tasksMock,
  setTasks: (tasks) => set({ tasks }),

  updateTaskStatus: (taskId, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t,
      ),
    })),

  addTask: (newTask) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...newTask,
          // Evitamos el error de Math.max con un array vacío
          id:
            state.tasks.length > 0
              ? Math.max(...state.tasks.map((t) => t.id)) + 1
              : 1,
          created_at: new Date().toISOString(),
        },
      ],
    })),
}));
