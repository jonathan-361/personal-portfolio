// TaskCard.tsx revisado
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Play, CheckCircle2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTaskStore } from "@/modules/core/store/task.store";
import { TaskDetailsModal } from "@/modules/tasks/components/TaskDetails";
import type { Task } from "@/modules/core/data/dashboard.types";

export function TaskCard({ task }: { task: Task }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const updateStatus = useTaskStore((state) => state.updateTaskStatus);

  const isPending = task.status === "PENDIENTE";
  const isInProgress = task.status === "PROCESO";
  const isCompleted = task.status === "COMPLETADO";

  return (
    <>
      <Card
        onClick={() => setIsDetailsOpen(true)} // Abre el modal al hacer clic en la card
        className={`bg-gray-900/40 border-gray-800 border-l-4 transition-all duration-300 group shadow-md cursor-pointer hover:bg-gray-800/40
        ${isPending ? "border-l-blue-500" : isInProgress ? "border-l-yellow-500" : "border-l-green-500"} 
        ${isCompleted ? "opacity-60" : ""}`}
      >
        <CardContent className="p-4 flex flex-col gap-3">
          <div className="space-y-1">
            <h3
              className={`font-bold text-sm text-white ${isCompleted ? "line-through text-gray-500" : ""}`}
            >
              {task.title}
            </h3>
            <p className="text-xs text-gray-400 line-clamp-2">
              {task.description}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-gray-800/50 pt-3">
            <div className="flex gap-1">
              {isPending && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-7 px-2 text-[10px] gap-1 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que se abra el modal
                    updateStatus(task.id, "PROCESO");
                  }}
                >
                  <Play className="w-3 h-3" /> Comenzar
                </Button>
              )}
              {isInProgress && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-7 px-2 text-[10px] gap-1 bg-green-600 hover:bg-green-700 text-white"
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que se abra el modal
                    updateStatus(task.id, "COMPLETADO");
                  }}
                >
                  <CheckCircle2 className="w-3 h-3" /> Finalizar
                </Button>
              )}
              {!isPending && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 text-gray-500 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que se abra el modal
                    updateStatus(
                      task.id,
                      isInProgress ? "PENDIENTE" : "PROCESO",
                    );
                  }}
                >
                  <RotateCcw className="w-3 h-3" />
                </Button>
              )}
            </div>

            <div className="flex items-center gap-1 text-[10px] text-gray-500">
              <Calendar className="w-3 h-3" />
              {task.task_date || "S/N"}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Renderizamos el modal de detalles */}
      <TaskDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        task={task}
      />
    </>
  );
}
