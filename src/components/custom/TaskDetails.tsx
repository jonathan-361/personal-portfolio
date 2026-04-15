import { Calendar, Clock, Info } from "lucide-react";
import type { Task } from "@/modules/tasks/models/task.model";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  TASK_DETAILS_THEME,
  TASK_STATUS_THEME,
} from "@/modules/core/data/theme.modules";

interface TaskDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

export function TaskDetails({ isOpen, onClose, task }: TaskDetailsProps) {
  if (!task) return null;

  const theme = TASK_DETAILS_THEME;
  const statusStyle =
    TASK_STATUS_THEME[task.in_progress as keyof typeof TASK_STATUS_THEME];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={`sm:max-w-md w-[95vw] border-t-4 ${statusStyle.borderT} ${theme.container} bg-black border-white/10 shadow-2xl`}
      >
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${statusStyle.border} ${statusStyle.iconColor} bg-black/50`}
            >
              {task.in_progress}
            </span>
          </div>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Info className={`w-5 h-5 ${statusStyle.iconColor}`} />
            {task.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Grid de Fechas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className={theme.label}>Fecha Límite</Label>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-300">
                <Calendar className="w-3.5 h-3.5 text-gray-500" />
                {task.task_date ? task.task_date.split("T")[0] : "Sin fecha"}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className={theme.label}>Fecha de Creación</Label>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs text-gray-500">
                <Clock className="w-3.5 h-3.5 text-gray-700" />
                {new Date(task.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="space-y-1.5">
            <Label className={theme.label}>Descripción</Label>
            <div className="p-4 rounded-lg bg-white/5 border border-white/5 min-h-[120px] max-h-[200px] overflow-y-auto custom-scrollbar">
              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap break-all">
                {task.description ||
                  "Esta tarea no tiene una descripción detallada."}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
