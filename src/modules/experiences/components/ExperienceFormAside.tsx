import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Edit3,
  Trash2,
  Save,
  Briefcase,
  Loader2,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { CustomAside } from "@/components/custom/CustomAside";
import { ConfirmDialog } from "@/components/custom/ConfirmDialog";
import Loading from "@/components/custom/Loading";
import { useExperienceStore } from "@/modules/core/store/experience.store";
import { toast } from "sonner";
import type { Experience } from "@/modules/experiences/models/experience.model";

const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <p className="text-red-500 text-[10px] mt-1 flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
      <AlertCircle className="w-3 h-3" /> {message}
    </p>
  );
};

interface ExperienceFormAsideProps {
  initialData: Experience | null;
  onCancel: () => void;
  onSave: () => void;
}

interface ExperienceFormValues {
  company: string;
  position: string;
  start_date: string;
  end_date: string | null;
  description: string;
  is_current: boolean;
}

export function ExperienceFormAside({
  initialData,
  onCancel,
  onSave,
}: ExperienceFormAsideProps) {
  const { addExperience, updateExperienceInStore, removeExperienceFromStore } =
    useExperienceStore();

  const [isEditing, setIsEditing] = useState(!initialData);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ExperienceFormValues>({
    defaultValues: {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    },
  });

  const isCurrentWork = watch("is_current");
  const startDateValue = watch("start_date");

  useEffect(() => {
    if (initialData) {
      reset({
        company: initialData.company,
        position: initialData.position,
        start_date: initialData.start_date?.split("T")[0] || "",
        end_date: initialData.end_date?.split("T")[0] || null,
        description: initialData.description || "",
        is_current: !initialData.end_date,
      });
      setIsEditing(false);
    } else {
      reset({
        company: "",
        position: "",
        start_date: new Date().toISOString().split("T")[0],
        end_date: null,
        description: "",
        is_current: false,
      });
      setIsEditing(true);
    }
  }, [initialData, reset]);

  const handleCurrentChange = (checked: boolean) => {
    setValue("is_current", checked);
    if (checked) setValue("end_date", null);
  };

  const onSubmit = async (data: ExperienceFormValues) => {
    setIsGlobalLoading(true);
    try {
      const dataToSubmit = {
        company: data.company,
        position: data.position,
        start_date: data.start_date,
        end_date: data.is_current ? null : data.end_date,
        description: data.description,
      };

      if (!initialData) {
        await addExperience(dataToSubmit as any);
        toast.success("Experiencia añadida correctamente");
      } else {
        await updateExperienceInStore(initialData.id, dataToSubmit as any);
        toast.success("Cambios actualizados");
      }

      onSave();
    } catch (error) {
      toast.error("Error al procesar la solicitud");
    } finally {
      setIsGlobalLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData) return;
    setIsAlertOpen(false);
    setIsGlobalLoading(true);
    try {
      await removeExperienceFromStore(initialData.id);
      toast.success("Experiencia eliminada");
      onSave();
    } catch (error) {
      toast.error("No se pudo eliminar el registro");
    } finally {
      setIsGlobalLoading(false);
    }
  };

  return (
    <>
      <CustomAside
        title={
          initialData
            ? isEditing
              ? "Editar"
              : "Detalles"
            : "Nueva Experiencia"
        }
        subtitle={isEditing ? "Formulario de Registro" : "Vista de Experiencia"}
        onClose={onCancel}
        headerAction={
          <div className="p-2 rounded-lg bg-blue-600/10 border border-blue-600/20">
            <Briefcase className="w-5 h-5 text-blue-500" />
          </div>
        }
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col h-full"
        >
          <div className="space-y-5 flex-1 text-white">
            {/* Compañía */}
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm">Compañía *</Label>
              <Input
                {...register("company", {
                  required: "La compañía es obligatoria",
                })}
                disabled={!isEditing || isSubmitting}
                className={`bg-[#0f0f0f] border-gray-800 focus-visible:ring-blue-500/50 ${
                  errors.company ? "border-red-500" : ""
                }`}
              />
              <ErrorMessage message={errors.company?.message} />
            </div>

            {/* Posición */}
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm">Posición *</Label>
              <Input
                {...register("position", {
                  required: "El cargo es obligatorio",
                })}
                disabled={!isEditing || isSubmitting}
                className={`bg-[#0f0f0f] border-gray-800 focus-visible:ring-blue-500/50 ${
                  errors.position ? "border-red-500" : ""
                }`}
              />
              <ErrorMessage message={errors.position?.message} />
            </div>

            {/* Fechas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-300 text-sm">Fecha Inicio</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 z-10 pointer-events-none" />
                  <Input
                    {...register("start_date", { required: "Requerido" })}
                    type="date"
                    disabled={!isEditing || isSubmitting}
                    className={`bg-[#0f0f0f] border-gray-800 pl-10 text-[12px] scheme-dark ${
                      errors.start_date ? "border-red-500" : ""
                    }`}
                  />
                </div>
                <ErrorMessage message={errors.start_date?.message} />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300 text-sm">Fecha Fin</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 z-10 pointer-events-none" />
                  <Input
                    {...register("end_date", {
                      validate: (value) => {
                        if (isCurrentWork) return true;
                        if (value && startDateValue && value < startDateValue) {
                          return "No puede ser anterior al inicio";
                        }
                        return true;
                      },
                    })}
                    type="date"
                    min={startDateValue}
                    disabled={!isEditing || isCurrentWork || isSubmitting}
                    className={`bg-[#0f0f0f] border-gray-800 pl-10 text-[12px] scheme-dark disabled:opacity-20 ${
                      errors.end_date ? "border-red-500" : ""
                    }`}
                  />
                </div>
                <ErrorMessage message={errors.end_date?.message} />
              </div>
            </div>

            {/* Trabajo actual */}
            <div
              className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                isCurrentWork
                  ? "bg-blue-600/10 border-blue-600/30"
                  : "bg-gray-900/30 border-gray-800"
              }`}
            >
              <Checkbox
                id="current"
                disabled={!isEditing || isSubmitting}
                checked={isCurrentWork}
                onCheckedChange={handleCurrentChange}
              />
              <label
                htmlFor="current"
                className="text-sm cursor-pointer text-gray-400 font-medium"
              >
                Trabajo actual
              </label>
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm font-bold uppercase tracking-tighter text-[10px]">
                Descripción *
              </Label>
              <Textarea
                {...register("description", {
                  required: "Escribe una breve descripción",
                })}
                disabled={!isEditing || isSubmitting}
                className={`bg-[#0f0f0f] border-gray-800 resize-none min-h-[120px] max-h-[250px] overflow-y-auto ${
                  errors.description ? "border-red-500" : ""
                }`}
              />
              <ErrorMessage message={errors.description?.message} />
            </div>
          </div>

          {/* Botones */}
          <div className="pt-6 border-t border-gray-800 flex flex-col gap-3 bg-black">
            {initialData && !isEditing ? (
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700 font-bold gap-2"
                >
                  <Edit3 className="w-4 h-4" /> Editar
                </Button>

                <Button
                  type="button"
                  onClick={() => setIsAlertOpen(true)}
                  variant="ghost"
                  className="text-red-500 hover:bg-red-600/10 hover:text-white font-bold gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Borrar
                </Button>
              </div>
            ) : (
              <>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black hover:bg-gray-200 font-bold gap-2"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {initialData ? "Guardar Cambios" : "Guardar Experiencia"}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  disabled={isSubmitting}
                  onClick={initialData ? () => setIsEditing(false) : onCancel}
                  className="w-full text-gray-500"
                >
                  Cancelar
                </Button>
              </>
            )}
          </div>
        </form>
      </CustomAside>
      <ConfirmDialog
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        title="¿Eliminar experiencia?"
        description={`Se eliminará permanentemente la experiencia en "${initialData?.company}".`}
        confirmText="Eliminar"
        onConfirm={handleDelete}
      />
      {isGlobalLoading && <Loading />}
    </>
  );
}
