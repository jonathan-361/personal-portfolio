import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomAside } from "@/components/custom/CustomAside";
import { ConfirmDialog } from "@/components/custom/ConfirmDialog";
import Loading from "@/components/custom/Loading";
import { Edit3, Trash2, Save, Calendar, Loader2 } from "lucide-react";
import { ACHIEVEMENT_THEME } from "@/modules/core/data/theme.modules";
import { useAchievementStore } from "@/modules/core/store/achievement.store";
import { achievementService } from "@/modules/core/services/achievement-services/achievement.services";

interface AchievementFormAsideProps {
  initialData?: any;
  onCancel: () => void;
  onSave: () => void;
}

interface AchievementFormValues {
  title: string;
  description: string;
  achievement_type: string;
  achieved_at: string;
}

export function AchievementFormAside({
  initialData,
  onCancel,
  onSave,
}: AchievementFormAsideProps) {
  const {
    addAchievement,
    updateAchievementInStore,
    removeAchievementFromStore,
  } = useAchievementStore();
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(!initialData);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const themeToDbMap: Record<string, string> = {
    Académico: "ACADEMICO",
    Profesional: "PROFESIONAL",
    Personal: "PERSONAL",
  };

  const dbToThemeMap: Record<string, string> = {
    ACADEMICO: "Académico",
    PROFESIONAL: "Profesional",
    PERSONAL: "Personal",
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<AchievementFormValues>({
    defaultValues: {
      title: "",
      description: "",
      achievement_type: "Personal",
      achieved_at: new Date().toISOString().split("T")[0],
    },
  });

  const selectedTheme = watch("achievement_type");

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title || "",
        description: initialData.description || "",
        achievement_type:
          dbToThemeMap[initialData.achievement_type] || "Personal",
        achieved_at: initialData.achieved_at?.split("T")[0] || "",
      });
      setIsEditing(false);
    } else {
      reset({
        title: "",
        description: "",
        achievement_type: "Personal",
        achieved_at: new Date().toISOString().split("T")[0],
      });
      setIsEditing(true);
    }
  }, [initialData, reset]);

  const onSubmit = async (data: AchievementFormValues) => {
    setIsGlobalLoading(true);
    try {
      const dataToSubmit = {
        ...data,
        achievement_type: themeToDbMap[data.achievement_type] || "PERSONAL",
      };

      if (!initialData) {
        const newAch = await achievementService.create(dataToSubmit as any);
        addAchievement(newAch);
        toast.success("¡Logro guardado con éxito!");
      } else {
        await achievementService.update(initialData.id, dataToSubmit as any);
        updateAchievementInStore(initialData.id, {
          ...dataToSubmit,
          id: initialData.id,
        } as any);
        toast.success("Logro actualizado correctamente");
      }
      onSave();
    } catch (error) {
      toast.error("Hubo un error al conectar con el servidor");
    } finally {
      setIsGlobalLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData) return;
    setIsDeleting(true);
    try {
      await achievementService.delete(initialData.id);
      removeAchievementFromStore(initialData.id);
      toast.success("Logro eliminado correctamente");
      setIsDeleteDialogOpen(false);
      onSave();
    } catch (error) {
      toast.error("No se pudo eliminar el logro");
    } finally {
      setIsGlobalLoading(false);
    }
  };

  const config =
    ACHIEVEMENT_THEME[selectedTheme as keyof typeof ACHIEVEMENT_THEME] ||
    ACHIEVEMENT_THEME.Personal;

  return (
    <>
      <CustomAside
        title={
          initialData ? (isEditing ? "Editar" : "Detalles") : "Nuevo Logro"
        }
        subtitle={`LOGRO ${config.label.toUpperCase()}`}
        onClose={onCancel}
        headerAction={
          <div
            className={`p-2 rounded-lg ${config.theme.bgStrong} border ${config.theme.iconBorder} transition-all duration-300`}
          >
            <config.icon className={`w-5 h-5 ${config.theme.text}`} />
          </div>
        }
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col h-full"
        >
          <div className="space-y-5 flex-1">
            {/* Título */}
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm font-medium">
                Título <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register("title", { required: "El título es obligatorio" })}
                disabled={!isEditing || isSubmitting}
                placeholder="Ej. Certificación AWS"
                className={`bg-[#0f0f0f] border-gray-800 text-white focus:ring-1 focus:ring-purple-500 ${errors.title ? "border-red-500/50" : ""}`}
              />
              {errors.title && (
                <p className="text-[10px] text-red-400 font-medium">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Categoría */}
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm font-medium">
                Categoría <span className="text-red-500">*</span>
              </Label>
              <Select
                disabled={!isEditing || isSubmitting}
                // Solución al error de tipos: forzamos el valor a string o fallback
                onValueChange={(v) =>
                  setValue("achievement_type", v || "Personal")
                }
                value={selectedTheme}
              >
                <SelectTrigger
                  className={`bg-[#0f0f0f] border-gray-800 text-white ${errors.achievement_type ? "border-red-500/50" : ""}`}
                >
                  <SelectValue placeholder="Selecciona categoría" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800 text-white">
                  {Object.keys(ACHIEVEMENT_THEME).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* Registro del campo para validación */}
              <input
                type="hidden"
                {...register("achievement_type", {
                  required: "La categoría es obligatoria",
                })}
              />
              {errors.achievement_type && (
                <p className="text-[10px] text-red-400 font-medium">
                  {errors.achievement_type.message}
                </p>
              )}
            </div>

            {/* Fecha */}
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm font-medium">
                Fecha <span className="text-red-500">*</span>
              </Label>
              <div className="relative group">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white z-10 pointer-events-none" />
                <Input
                  {...register("achieved_at", {
                    required: "La fecha es obligatoria",
                  })}
                  type="date"
                  disabled={!isEditing || isSubmitting}
                  className={`bg-[#0f0f0f] border-gray-800 pl-10 text-white w-full scheme-dark [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer ${errors.achieved_at ? "border-red-500/50" : ""}`}
                />
              </div>
              {errors.achieved_at && (
                <p className="text-[10px] text-red-400 font-medium">
                  {errors.achieved_at.message}
                </p>
              )}
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm font-medium">
                Descripción <span className="text-red-500">*</span>
              </Label>
              <Textarea
                {...register("description", {
                  required: "La descripción es obligatoria",
                })}
                disabled={!isEditing || isSubmitting}
                placeholder="¿Qué lograste?"
                className={`bg-[#0f0f0f] border-gray-800 text-white resize-none 
                           min-h-[120px] max-h-[250px] overflow-y-auto 
                           ${errors.description ? "border-red-500/50" : ""}`}
              />
              {errors.description && (
                <p className="text-[10px] text-red-400 font-medium">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="pt-6 border-t border-gray-800 flex flex-col gap-3 mt-6">
            {initialData && !isEditing ? (
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className={`text-white font-bold gap-2 transition-all duration-300 ${config.theme.button}`}
                >
                  <Edit3 className="w-4 h-4" /> Editar
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsDeleteDialogOpen(true)}
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
                  {initialData ? "Guardar Cambios" : "Guardar Logro"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  disabled={isSubmitting}
                  onClick={initialData ? () => setIsEditing(false) : onCancel}
                  className="text-gray-500 hover:text-black"
                >
                  Cancelar
                </Button>
              </>
            )}
          </div>
        </form>
      </CustomAside>
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="¿Eliminar logro?"
        description={`Estás a punto de eliminar "${initialData?.title}". Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Volver"
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
      {isGlobalLoading && <Loading />}
    </>
  );
}
