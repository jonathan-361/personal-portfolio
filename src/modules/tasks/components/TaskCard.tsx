import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Play,
  CheckCircle2,
  RotateCcw,
  ListTodo,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTaskStore } from "@/modules/core/store/task.store";
import { TaskDetails } from "@/modules/tasks/components/TaskDetails";
import { TASK_STATUS_THEME } from "@/modules/core/data/theme.modules";
import type { Task } from "@/modules/tasks/models/task.model";

export function TaskCard({ task }: { task: Task }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const updateStatus = useTaskStore((state) => state.updateTaskStatus);

  const statusKey = task.in_progress as keyof typeof TASK_STATUS_THEME;
  const config = TASK_STATUS_THEME[statusKey];

  const isPending = task.in_progress === "PENDIENTE";
  const isInProgress = task.in_progress === "EN PROCESO";
  const isCompleted = task.in_progress === "COMPLETADO";

  return (
    <>
      <Card
        onClick={() => setIsDetailsOpen(true)}
        className={`
          relative overflow-hidden bg-gradient-to-br from-gray-900/40 ${config.gradient}
          ${config.cardBorder} border-t-4 ${config.borderT}
          transition-all duration-300 group shadow-md cursor-pointer 
          hover:shadow-xl hover:scale-[1.02] hover:bg-gray-800/40
          ${isCompleted ? "opacity-75" : ""}
        `}
      >
        <CardContent className="p-5 flex flex-col gap-4 relative z-10">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className={`p-1.5 rounded-md ${config.bg} border border-white/5`}
                >
                  <ListTodo className={`w-3.5 h-3.5 ${config.iconColor}`} />
                </div>
                <span
                  className={`text-[10px] font-black uppercase tracking-widest ${config.iconColor}`}
                >
                  {config.label}
                </span>
              </div>
              <h3
                className={`font-bold text-base text-white truncate transition-colors group-hover:text-white/90 ${isCompleted ? "line-through text-gray-500" : ""}`}
              >
                {task.title}
              </h3>
              <p className="text-xs text-gray-400/80 line-clamp-2 italic border-l border-white/10 pl-3">
                {task.description || "Sin descripción detallada."}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <div className="flex gap-2">
              {isPending && (
                <Button
                  size="sm"
                  className="h-8 px-3 text-[10px] font-bold uppercase gap-1.5 bg-blue-600 hover:bg-blue-700 text-white transition-all active:scale-95"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateStatus(task.id, "EN PROCESO");
                  }}
                >
                  <Play className="w-3 h-3 fill-current" /> Comenzar
                </Button>
              )}
              {isInProgress && (
                <Button
                  size="sm"
                  className="h-8 px-3 text-[10px] font-bold uppercase gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white transition-all active:scale-95"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateStatus(task.id, "COMPLETADO");
                  }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Finalizar
                </Button>
              )}
              {!isPending && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-gray-500 hover:text-white hover:bg-white/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateStatus(
                      task.id,
                      isInProgress ? "PENDIENTE" : "EN PROCESO",
                    );
                  }}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 bg-black/30 px-2 py-1 rounded-md border border-white/5">
              <Calendar className="w-3 h-3" />
              {task.task_date ? task.task_date.split("T")[0] : "S/FECHA"}
            </div>
          </div>
        </CardContent>
      </Card>

      <TaskDetails
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        task={task as any}
      />
    </>
  );
}
