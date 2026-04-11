import { useState } from "react";
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
import { Edit3, Trash2, Save, Calendar } from "lucide-react";
import { ACHIEVEMENT_THEME } from "@/modules/core/data/theme.modules";

export function AchievementFormAside({ initialData, onCancel, onSave }: any) {
  const [isEditing, setIsEditing] = useState(!initialData);
  const [selectedType, setSelectedType] = useState(
    initialData?.type || "Personal",
  );
  const config =
    ACHIEVEMENT_THEME[selectedType as keyof typeof ACHIEVEMENT_THEME];

  return (
    <CustomAside
      title={initialData ? (isEditing ? "Editar" : "Detalles") : "Nuevo Logro"}
      subtitle={`LOGRO ${config.label}`}
      onClose={onCancel}
      headerAction={
        <div
          className={`p-2 rounded-lg ${config.theme.bgStrong} border ${config.theme.iconBorder}`}
        >
          <config.icon className={`w-5 h-5 ${config.theme.text}`} />
        </div>
      }
    >
      <div className="flex flex-col h-full">
        <div className="space-y-5 flex-1">
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Título</Label>
            <Input
              disabled={!isEditing}
              defaultValue={initialData?.title}
              className="bg-[#0f0f0f] border-gray-800"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Categoría</Label>
            <Select
              disabled={!isEditing}
              defaultValue={selectedType}
              onValueChange={(v) => setSelectedType(v as any)}
            >
              <SelectTrigger className="bg-[#0f0f0f] border-gray-800">
                <SelectValue />
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
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Fecha</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                type="date"
                disabled={!isEditing}
                defaultValue={initialData?.achieved_at}
                className="bg-[#0f0f0f] border-gray-800 pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Descripción</Label>
            <Textarea
              disabled={!isEditing}
              defaultValue={initialData?.description}
              className="bg-[#0f0f0f] border-gray-800 min-h-32"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800 flex flex-col gap-3 mt-6">
          {initialData && !isEditing ? (
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => setIsEditing(true)}
                className={`text-white font-bold gap-2 ${config.theme.button}`}
              >
                <Edit3 className="w-4 h-4" /> Editar
              </Button>
              <Button
                variant="ghost"
                className="text-red-500 hover:bg-red-600/10 font-bold gap-2"
              >
                <Trash2 className="w-4 h-4" /> Borrar
              </Button>
            </div>
          ) : (
            <>
              <Button
                onClick={onSave}
                className="w-full bg-white text-black hover:bg-gray-200 font-bold gap-2"
              >
                <Save className="w-4 h-4" /> Guardar
              </Button>
              <Button
                variant="ghost"
                onClick={initialData ? () => setIsEditing(false) : onCancel}
                className="text-gray-500"
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
