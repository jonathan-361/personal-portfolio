import { Checkbox } from "@/components/ui/checkbox";
import type { Task } from "@/modules/core/data/dashboard.types";

export function TaskPreview({ tasks }: { tasks: Task[] }) {
  return (
    <>
      {tasks.slice(0, 3).map((task) => (
        <div key={task.id} className="flex items-center gap-3 p-1">
          <Checkbox
            checked={task.status === "COMPLETADO"}
            disabled
            className="border-gray-700 data-[state=checked]:bg-blue-600"
          />
          <p
            className={`text-sm truncate ${
              task.status === "COMPLETADO"
                ? "text-gray-600 line-through"
                : "text-gray-300"
            }`}
          >
            {task.title}
          </p>
        </div>
      ))}
    </>
  );
}
