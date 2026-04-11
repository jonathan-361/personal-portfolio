import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit3, Trash2, Save, Briefcase } from "lucide-react";
import { CustomAside } from "@/components/custom/CustomAside";
import type { Experience } from "@/modules/core/data/dashboard.types";

interface ExperienceFormAsideProps {
  initialData: Experience | null;
  onCancel: () => void;
  onSave: () => void;
}

export function ExperienceFormAside({
  initialData,
  onCancel,
  onSave,
}: ExperienceFormAsideProps) {
  const [isEditing, setIsEditing] = useState(!initialData);
  const [isCurrentWork, setIsCurrentWork] = useState(
    initialData ? !initialData.end_date : false,
  );

  useEffect(() => {
    setIsCurrentWork(initialData ? !initialData.end_date : false);
  }, [initialData]);

  const HeaderIcon = (
    <div className="p-2 rounded-lg bg-blue-600/10 border border-blue-600/20">
      <Briefcase className="w-5 h-5 text-blue-500" />
    </div>
  );

  return (
    <CustomAside
      title={
        initialData ? (isEditing ? "Editar" : "Detalles") : "Nueva Experiencia"
      }
      subtitle={isEditing ? "Formulario de Registro" : "Vista de Experiencia"}
      onClose={onCancel}
      headerAction={HeaderIcon}
    >
      <div className="flex flex-col h-full gap-6">
        <div className="space-y-5 flex-1">
          {/* Compañía */}
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Compañía</Label>
            <Input
              disabled={!isEditing}
              defaultValue={initialData?.company ?? ""}
              placeholder="Ej: IMSS Mérida"
              className="bg-[#0f0f0f] border-gray-800 focus-visible:ring-blue-500/50"
            />
          </div>

          {/* Posición */}
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Posición</Label>
            <Input
              disabled={!isEditing}
              defaultValue={initialData?.position ?? ""}
              placeholder="Ej: Desarrollador Jr."
              className="bg-[#0f0f0f] border-gray-800 focus-visible:ring-blue-500/50"
            />
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm">Fecha Inicio</Label>
              <Input
                type="date"
                disabled={!isEditing}
                defaultValue={initialData?.start_date ?? ""}
                className="bg-[#0f0f0f] border-gray-800 text-[12px]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300 text-sm">Fecha Fin</Label>
              <Input
                type="date"
                disabled={!isEditing || isCurrentWork}
                defaultValue={
                  isCurrentWork ? "" : (initialData?.end_date ?? "")
                }
                className="bg-[#0f0f0f] border-gray-800 text-[12px] disabled:opacity-30"
              />
            </div>
          </div>

          {/* Checkbox de Trabajo Actual */}
          <div
            className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
              isCurrentWork
                ? "bg-blue-600/10 border-blue-600/30"
                : "bg-gray-900/30 border-gray-800"
            }`}
          >
            <Checkbox
              id="current"
              disabled={!isEditing}
              checked={isCurrentWork}
              onCheckedChange={(checked) => setIsCurrentWork(!!checked)}
              className="border-gray-600 data-[state=checked]:bg-blue-600"
            />
            <label
              htmlFor="current"
              className={`text-sm cursor-pointer select-none ${
                isCurrentWork ? "text-blue-400 font-medium" : "text-gray-400"
              }`}
            >
              Actualmente trabajo aquí
            </label>
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Descripción</Label>
            <Textarea
              disabled={!isEditing}
              defaultValue={initialData?.description ?? ""}
              placeholder="Describe tus responsabilidades..."
              className="bg-[#0f0f0f] border-gray-800 focus-visible:ring-blue-500/50 min-h-32 resize-none"
            />
          </div>
        </div>

        {/* Footer de Acciones */}
        <div className="pt-6 border-t border-gray-800 flex flex-col gap-3 bg-black">
          {initialData && !isEditing ? (
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2"
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
                <Save className="w-4 h-4" />
                {initialData ? "Guardar Cambios" : "Guardar Experiencia"}
              </Button>
              <Button
                variant="ghost"
                onClick={initialData ? () => setIsEditing(false) : onCancel}
                className="w-full text-gray-500 hover:text-white hover:bg-gray-900"
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
