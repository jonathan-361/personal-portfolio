import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Trash2, Edit3, Save } from "lucide-react";
import { useTaskStore } from "@/modules/core/store/task.store";
import { taskService } from "@/modules/core/services/task-services/task.services";
import { toast } from "sonner";
import {
  TASK_DETAILS_THEME,
  TASK_STATUS_THEME,
} from "@/modules/core/data/theme.modules";
import type { TaskResponse } from "@/modules/tasks/models/task.model";

interface TaskDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskResponse | null;
}

export function TaskDetails({ isOpen, onClose, task }: TaskDetailsProps) {
  const { updateTaskInStore, removeTaskFromStore } = useTaskStore();
  const theme = TASK_DETAILS_THEME;

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    if (task && isOpen) {
      setFormValues({
        title: task.title,
        description: task.description || "",
        date: task.task_date ? task.task_date.split("T")[0] : "",
      });
      setIsEditing(false);
    }
  }, [task, isOpen]);

  if (!task) return null;

  const statusStyle =
    TASK_STATUS_THEME[task.in_progress as keyof typeof TASK_STATUS_THEME];

  // Estilo para campos cuando no se está editando (efecto "bloqueado" gris)
  const readOnlyStyles =
    "disabled:bg-black/40 disabled:border-white/5 disabled:text-gray-500 disabled:opacity-100";

  const handleSave = async () => {
    if (!formValues.title.trim())
      return toast.error("El título es obligatorio");
    setIsLoading(true);
    try {
      const payload = {
        title: formValues.title,
        description: formValues.description,
        task_date: formValues.date,
      };
      await taskService.update(task.id, payload as any);
      updateTaskInStore(task.id, payload);
      toast.success("Actividad actualizada");
      setIsEditing(false);
      onClose();
    } catch (error) {
      toast.error("Error al guardar cambios");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await taskService.delete(task.id);
      removeTaskFromStore(task.id);
      toast.success("Actividad eliminada");
      setIsAlertOpen(false);
      onClose();
    } catch (error) {
      toast.error("No se pudo eliminar la tarea");
    }
  };

  return (
    <>
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
              {isEditing ? (
                <Edit3 className="w-5 h-5 text-blue-400" />
              ) : (
                <theme.header.icon
                  className={`w-5 h-5 ${theme.header.color}`}
                />
              )}
              {isEditing ? "Editar Actividad" : task.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Título */}
            <div className="space-y-1.5">
              <Label className={theme.label}>Título de la tarea</Label>
              <Input
                disabled={!isEditing || isLoading}
                value={formValues.title}
                onChange={(e) =>
                  setFormValues((prev) => ({ ...prev, title: e.target.value }))
                }
                className={`${theme.input} ${!isEditing ? readOnlyStyles : ""}`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Fecha Límite */}
              <div className="space-y-1.5">
                <Label className={theme.label}>Fecha Límite</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-500" />
                  <Input
                    type="date"
                    disabled={!isEditing || isLoading}
                    value={formValues.date}
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                    className={`${theme.input} pl-9 text-xs ${!isEditing ? readOnlyStyles : ""}`}
                  />
                </div>
              </div>

              {/* Creado el (Siempre bloqueado) */}
              <div className="space-y-1.5">
                <Label className={theme.label}>Creado el</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-700" />
                  <Input
                    disabled
                    value={new Date(task.created_at).toLocaleDateString()}
                    className={`pl-9 text-xs bg-black/40 border-white/5 text-gray-500 opacity-100`}
                  />
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="space-y-1.5">
              <Label className={theme.label}>Descripción</Label>
              <Textarea
                disabled={!isEditing || isLoading}
                value={formValues.description}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className={`${theme.input} min-h-[100px] resize-none text-sm ${!isEditing ? readOnlyStyles : ""}`}
                placeholder="Sin descripción..."
              />
            </div>
          </div>

          <DialogFooter className="mt-4 pt-4 border-t border-white/10 gap-2 bg-transparent">
            {!isEditing ? (
              <div className="flex justify-between w-full">
                <Button
                  variant="ghost"
                  onClick={() => setIsAlertOpen(true)}
                  className={theme.buttons.delete}
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Eliminar
                </Button>
                <Button
                  onClick={() => setIsEditing(true)}
                  className={theme.buttons.edit}
                >
                  <Edit3 className="w-4 h-4 mr-2" /> Editar
                </Button>
              </div>
            ) : (
              <div className="flex justify-end gap-2 w-full">
                <Button
                  variant="ghost"
                  onClick={() => setIsEditing(false)}
                  className={theme.buttons.cancel}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className={theme.buttons.save}
                >
                  <Save className="w-4 h-4 mr-2" />{" "}
                  {isLoading ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="bg-black border border-white/10 text-white shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold">
              ¿Eliminar actividad?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Esta acción eliminará permanentemente la tarea{" "}
              <span className="text-white font-medium">"{task.title}"</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4 bg-black">
            <AlertDialogCancel className="bg-transparent border-white/10 text-gray-400 hover:bg-white/5 hover:text-white transition-all">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white border-none"
            >
              Confirmar Eliminación
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
