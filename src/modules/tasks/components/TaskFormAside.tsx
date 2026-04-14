import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckSquare, Save, Loader2, Calendar } from "lucide-react";
import { CustomAside } from "@/components/custom/CustomAside";
import Loading from "@/components/custom/Loading";
import { useTaskStore } from "@/modules/core/store/task.store";
import { taskService } from "@/modules/core/services/task-services/task.services";

export function TaskFormAside({ onClose }: { onClose: () => void }) {
  const addTask = useTaskStore((state) => state.addTask);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }, // Extraemos 'errors' para mostrar validaciones
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      task_date: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = async (data: any) => {
    setIsGlobalLoading(true);
    try {
      const newTask = await taskService.create({
        title: data.title,
        description: data.description,
        task_date: data.task_date,
        in_progress: "PENDIENTE",
      } as any);

      addTask(newTask);
      toast.success("Tarea creada correctamente");
      onClose();
    } catch (error) {
      toast.error("Error al crear la tarea");
    } finally {
      setIsGlobalLoading(false);
    }
  };

  return (
    <>
      <CustomAside
        title="Nueva Actividad"
        subtitle="Gestión de Tareas"
        onClose={onClose}
        headerAction={
          <div className="p-2 rounded-lg bg-purple-600/10 border border-purple-600/20">
            <CheckSquare className="w-5 h-5 text-purple-500" />
          </div>
        }
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col h-full gap-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-5 flex-1">
            {/* Título */}
            <div className="space-y-2">
              <Label className="text-gray-400 text-[10px] uppercase tracking-widest font-black">
                Título <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register("title", { required: "El título es obligatorio" })}
                disabled={isSubmitting}
                placeholder="¿Qué hay que hacer?"
                className={`bg-[#0f0f0f] border-gray-800 text-white focus:border-purple-500 transition-colors ${
                  errors.title ? "border-red-500/50" : ""
                }`}
              />
              {errors.title && (
                <p className="text-[10px] text-red-400 font-medium">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Fecha Límite */}
            <div className="space-y-2">
              <Label className="text-gray-400 text-[10px] uppercase tracking-widest font-black">
                Fecha Límite <span className="text-red-500">*</span>
              </Label>
              <div
                className="relative group"
                onClick={(e) => e.stopPropagation()}
              >
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10 pointer-events-none group-focus-within:text-purple-500 transition-colors" />
                <Input
                  {...register("task_date", {
                    required: "La fecha es obligatoria",
                  })}
                  type="date"
                  disabled={isSubmitting}
                  className={`bg-[#0f0f0f] border-gray-800 pl-10 text-white w-full scheme-dark 
                           [&::-webkit-calendar-picker-indicator]:absolute 
                           [&::-webkit-calendar-picker-indicator]:inset-0 
                           [&::-webkit-calendar-picker-indicator]:cursor-pointer 
                           [&::-webkit-calendar-picker-indicator]:opacity-0 ${
                             errors.task_date ? "border-red-500/50" : ""
                           }`}
                />
              </div>
              {errors.task_date && (
                <p className="text-[10px] text-red-400 font-medium">
                  {errors.task_date.message}
                </p>
              )}
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <Label className="text-gray-400 text-[10px] uppercase tracking-widest font-black">
                Descripción <span className="text-red-500">*</span>
              </Label>
              <Textarea
                {...register("description", {
                  required: "La descripción es obligatoria",
                })}
                disabled={isSubmitting}
                placeholder="Detalles adicionales..."
                className={`bg-[#0f0f0f] border-gray-800 text-white resize-none focus:border-purple-500 transition-colors
                           min-h-[160px] max-h-[300px] overflow-y-auto ${
                             errors.description ? "border-red-500/50" : ""
                           }`}
              />
              {errors.description && (
                <p className="text-[10px] text-red-400 font-medium">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-gray-800">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black font-bold hover:bg-gray-200 transition-all active:scale-[0.98]"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Crear Actividad
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-gray-500 hover:text-white hover:bg-white/5"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CustomAside>
      {isGlobalLoading && <Loading />}
    </>
  );
}
