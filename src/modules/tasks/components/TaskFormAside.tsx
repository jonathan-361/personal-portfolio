import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useTaskStore } from "@/modules/core/store/task.store";

export function TaskFormAside({ onClose }: { onClose: () => void }) {
  const addTask = useTaskStore((state) => state.addTask);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    addTask({
      title: data.title,
      description: data.description,
      task_date: data.task_date,
      status: "PENDIENTE",
      user_id: 1,
    });
    onClose();
  };

  return (
    <div className="w-full max-w-md bg-black border-l border-gray-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
      <header className="p-6 border-b border-gray-800 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Nueva Actividad</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </Button>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 flex flex-col gap-6"
      >
        <div className="space-y-2">
          <Label className="text-gray-400 text-xs uppercase tracking-widest">
            Título
          </Label>
          <Input
            {...register("title", { required: true })}
            placeholder="Nombre de la tarea..."
            className="bg-gray-900 border-gray-800 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-400 text-xs uppercase tracking-widest">
            Fecha Límite
          </Label>
          <Input
            {...register("task_date")}
            type="date"
            className="bg-gray-900 border-gray-800 text-white color-scheme-dark"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-400 text-xs uppercase tracking-widest">
            Descripción
          </Label>
          <Textarea
            {...register("description")}
            placeholder="Detalles adicionales..."
            className="bg-gray-900 border-gray-800 text-white min-h-[120px]"
          />
        </div>

        <div className="mt-auto flex gap-3 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 border-gray-800 text-black hover:bg-black hover:border-white hover:text-white"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-white text-black font-bold hover:bg-black hover:border-white hover:text-white"
          >
            Crear Tarea
          </Button>
        </div>
      </form>
    </div>
  );
}
