import { useState, useEffect } from "react";
import { CustomAside } from "@/components/custom/CustomAside";
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
import { Edit3, Trash2, Save, Calendar, Loader2 } from "lucide-react";
import { ACHIEVEMENT_THEME } from "@/modules/core/data/theme.modules";
import { useAchievementStore } from "@/modules/core/store/achievement.store";
import { achievementService } from "@/modules/core/services/achievement-services/achievement.services";
import { toast } from "sonner";

interface AchievementFormAsideProps {
  initialData?: any;
  onCancel: () => void;
  onSave: () => void;
}

export function AchievementFormAside({
  initialData,
  onCancel,
  onSave,
}: AchievementFormAsideProps) {
  // Acciones del store de Zustand
  const { addAchievement, updateAchievementInStore } = useAchievementStore();

  const [isEditing, setIsEditing] = useState(!initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado del formulario
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    achievement_type: "PERSONAL",
    achieved_at: new Date().toISOString().split("T")[0],
  });

  // Mapeos entre base de datos (Enum) y UI (Temas)
  const dbToThemeMap: Record<string, string> = {
    ACADEMICO: "Académico",
    PROFESIONAL: "Profesional",
    PERSONAL: "Personal",
  };

  const themeToDbMap: Record<string, string> = {
    Académico: "ACADEMICO",
    Profesional: "PROFESIONAL",
    Personal: "PERSONAL",
  };

  const [selectedTheme, setSelectedTheme] = useState<string>("Personal");

  // Sincronizar datos cuando llega initialData (Edición/Detalles)
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        achievement_type: initialData.achievement_type || "PERSONAL",
        achieved_at: initialData.achieved_at?.split("T")[0] || "",
      });
      const mappedType = dbToThemeMap[initialData.achievement_type];
      setSelectedTheme(mappedType ?? "Personal");
    } else {
      // Reset para nuevo registro
      setFormData({
        title: "",
        description: "",
        achievement_type: "PERSONAL",
        achieved_at: new Date().toISOString().split("T")[0],
      });
      setSelectedTheme("Personal");
    }
    setIsEditing(!initialData);
  }, [initialData]);

  const handleSave = async () => {
    if (!formData.title.trim()) {
      return toast.error("El título es obligatorio");
    }

    setIsSubmitting(true);
    try {
      const dataToSubmit = {
        ...formData,
        achievement_type: themeToDbMap[selectedTheme] || "PERSONAL",
      };

      if (!initialData) {
        // --- CREAR NUEVO LOGRO ---
        const newAch = await achievementService.create(dataToSubmit as any);
        addAchievement(newAch);
        toast.success("¡Logro guardado con éxito!");
      } else {
        // --- EDITAR LOGRO EXISTENTE ---
        await achievementService.update(initialData.id, dataToSubmit as any);

        // Actualización reactiva en el store local
        updateAchievementInStore(initialData.id, {
          ...dataToSubmit,
          id: initialData.id,
        } as any);

        toast.success("Logro actualizado correctamente");
      }

      onSave(); // Notificar éxito y cerrar aside
    } catch (error) {
      console.error("Error al procesar logro:", error);
      toast.error("Hubo un error al conectar con el servidor");
    } finally {
      setIsSubmitting(false);
    }
  };

  const config =
    ACHIEVEMENT_THEME[selectedTheme as keyof typeof ACHIEVEMENT_THEME] ||
    ACHIEVEMENT_THEME.Personal;

  return (
    <CustomAside
      title={initialData ? (isEditing ? "Editar" : "Detalles") : "Nuevo Logro"}
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
      <div className="flex flex-col h-full">
        <div className="space-y-5 flex-1">
          {/* Título */}
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm font-medium">Título</Label>
            <Input
              disabled={!isEditing || isSubmitting}
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Ej. Certificación AWS"
              className="bg-[#0f0f0f] border-gray-800 text-white focus:ring-1 focus:ring-purple-500"
            />
          </div>

          {/* Categoría */}
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm font-medium">
              Categoría
            </Label>
            <Select
              disabled={!isEditing || isSubmitting}
              value={selectedTheme}
              onValueChange={(v) => setSelectedTheme(v ?? "Personal")}
            >
              <SelectTrigger className="bg-[#0f0f0f] border-gray-800 text-white">
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
          </div>

          {/* Fecha */}
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm font-medium">Fecha</Label>
            <div className="relative group">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white z-10 pointer-events-none" />
              <Input
                type="date"
                disabled={!isEditing || isSubmitting}
                value={formData.achieved_at}
                onChange={(e) =>
                  setFormData({ ...formData, achieved_at: e.target.value })
                }
                className="bg-[#0f0f0f] border-gray-800 pl-10 text-white w-full scheme-dark [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
            </div>
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm font-medium">
              Descripción
            </Label>
            <Textarea
              disabled={!isEditing || isSubmitting}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="¿Qué lograste?"
              className="bg-[#0f0f0f] border-gray-800 min-h-[120px] text-white resize-none"
            />
          </div>
        </div>

        {/* Acciones del Footer */}
        <div className="pt-6 border-t border-gray-800 flex flex-col gap-3 mt-6">
          {initialData && !isEditing ? (
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => setIsEditing(true)}
                className={`text-white font-bold gap-2 transition-all duration-300 ${config.theme.button}`}
              >
                <Edit3 className="w-4 h-4" /> Editar
              </Button>
              <Button
                variant="ghost"
                className="text-red-500 hover:bg-red-600/10 hover:text-white font-bold gap-2"
              >
                <Trash2 className="w-4 h-4" /> Borrar
              </Button>
            </div>
          ) : (
            <>
              <Button
                onClick={handleSave}
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
      </div>
    </CustomAside>
  );
}
