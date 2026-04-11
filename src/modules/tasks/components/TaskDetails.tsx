import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Trash2 } from "lucide-react";
import type { Task } from "@/modules/core/data/dashboard.types";

interface TaskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

export function TaskDetailsModal({
  isOpen,
  onClose,
  task,
}: TaskDetailsModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setDate(task.task_date || "");
    }
  }, [task, isOpen]);

  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-125 w-[95vw] bg-black  text-white shadow-2xl border border-white/20 overflow-hidden">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                task.status === "COMPLETADO"
                  ? "border-green-500 text-green-500"
                  : task.status === "PROCESO"
                    ? "border-yellow-500 text-yellow-500"
                    : "border-blue-500 text-blue-500"
              }`}
            >
              {task.status}
            </span>
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight text-white wrap-break-words">
            Detalles de la Actividad
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Puedes visualizar o editar la información de esta tarea.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4 overflow-y-auto max-h-[60vh] px-1 custom-scrollbar">
          <div className="space-y-2">
            <Label className="text-xs uppercase text-gray-500 font-black">
              Título
            </Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-900/50 border-gray-800 focus:ring-blue-600 text-white w-full max-w-full"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase text-gray-500 font-black">
                Fecha
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-gray-900/50 border-gray-800 pl-10 text-white color-scheme-dark w-full"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase text-gray-500 font-black">
                Creado
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  disabled
                  value={new Date(task.created_at).toLocaleDateString()}
                  className="bg-gray-900/20 border-gray-800 pl-10 text-gray-500 cursor-not-allowed w-full"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase text-gray-500 font-black">
              Descripción
            </Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Añade detalles sobre esta actividad..."
              className="bg-gray-900/50 border-gray-800 min-h-30 resize-none text-white w-full max-w-full wrap-break-word whitespace-pre-wrap"
            />
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-900/20 -mx-6 -mb-6 p-6 border-t border-gray-800">
          <Button
            variant="ghost"
            className="text-red-500 hover:bg-red-500/10 hover:text-red-400 gap-2 w-full sm:w-auto"
          >
            <Trash2 className="w-4 h-4" /> Eliminar
          </Button>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="ghost"
              onClick={onClose}
              className="flex-1 sm:flex-none text-gray-400 hover:text-white"
            >
              Cerrar
            </Button>
            <Button className="flex-1 sm:flex-none bg-white text-black hover:bg-gray-200 font-bold px-6">
              Guardar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
