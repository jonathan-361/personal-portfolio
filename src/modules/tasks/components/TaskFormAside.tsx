import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckSquare, Save } from "lucide-react";
import { CustomAside } from "@/components/custom/CustomAside";
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

  const HeaderIcon = (
    <div className="p-2 rounded-lg bg-purple-600/10 border border-purple-600/20">
      <CheckSquare className="w-5 h-5 text-purple-500" />
    </div>
  );

  return (
    <CustomAside
      title="Nueva Actividad"
      subtitle="Gestión de Tareas"
      onClose={onClose}
      headerAction={HeaderIcon}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-full gap-6"
      >
        <div className="space-y-5 flex-1">
          <div className="space-y-2">
            <Label className="text-gray-400 text-xs uppercase tracking-widest font-bold">
              Título de la Tarea
            </Label>
            <Input
              {...register("title", { required: true })}
              placeholder="¿Qué hay que hacer?"
              className="bg-[#0f0f0f] border-gray-800 text-white focus-visible:ring-purple-500/50"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-400 text-xs uppercase tracking-widest font-bold">
              Fecha Límite
            </Label>
            <Input
              {...register("task_date")}
              type="date"
              className="bg-[#0f0f0f] border-gray-800 text-white color-scheme-dark"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-400 text-xs uppercase tracking-widest font-bold">
              Notas Adicionales
            </Label>
            <Textarea
              {...register("description")}
              placeholder="Detalles sobre el requerimiento..."
              className="bg-[#0f0f0f] border-gray-800 text-white min-h-40 resize-none"
            />
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-gray-800">
          <Button
            type="submit"
            className="w-full bg-white text-black font-bold hover:bg-gray-200 gap-2"
          >
            <Save className="w-4 h-4" />
            Crear Actividad
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="w-full text-gray-500 hover:text-white hover:bg-gray-900"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </CustomAside>
  );
}
