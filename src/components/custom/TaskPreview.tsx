import { Checkbox } from "@/components/ui/checkbox";
import type { Task } from "@/modules/tasks/models/task.model";

interface TaskPreviewProps {
  tasks: Task[];
}

export function TaskPreview({ tasks }: TaskPreviewProps) {
  const recentTasks = tasks.slice(0, 3);

  if (tasks.length === 0) {
    return (
      <p className="text-xs text-gray-600 italic p-1">
        No hay tareas pendientes.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {recentTasks.map((task) => {
        const isCompleted = task.in_progress === "COMPLETADO";

        return (
          <div key={task.id} className="flex items-center gap-3 p-1 group">
            <Checkbox
              checked={isCompleted}
              disabled
              className="border-gray-700 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 transition-colors"
            />
            <p
              className={`text-sm truncate transition-colors ${
                isCompleted
                  ? "text-gray-600 line-through"
                  : "text-gray-300 group-hover:text-white"
              }`}
            >
              {task.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}
