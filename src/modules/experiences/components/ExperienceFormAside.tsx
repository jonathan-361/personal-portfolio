import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calendar, X, Edit3, Trash2, Save } from "lucide-react";
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
    if (initialData) {
      setIsCurrentWork(!initialData.end_date);
    } else {
      setIsCurrentWork(false);
    }
  }, [initialData]);

  return (
    <aside className="w-96 h-full bg-black border-l border-gray-800 p-6 flex flex-col gap-6 animate-in slide-in-from-right duration-300 shadow-2xl z-50">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white">
            {initialData
              ? isEditing
                ? "Editar"
                : "Detalles"
              : "Nueva Experiencia"}
          </h2>
          <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
            {isEditing ? "Formulario" : "Vista previa"}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className="text-gray-500 hover:text-white hover:bg-gray-900"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="space-y-5 mt-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
        <div className="space-y-2">
          <Label className="text-gray-300 text-sm">Compañía</Label>
          <Input
            disabled={!isEditing}
            defaultValue={initialData?.company ?? ""}
            placeholder="Ej: IMSS Mérida"
            className="bg-[#0f0f0f] border-gray-800 focus-visible:ring-blue-500/50 disabled:opacity-70 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300 text-sm">Posición</Label>
          <Input
            disabled={!isEditing}
            defaultValue={initialData?.position ?? ""}
            placeholder="Ej: Desarrollador Jr."
            className="bg-[#0f0f0f] border-gray-800 focus-visible:ring-blue-500/50 disabled:opacity-70 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300 text-sm">Descripción</Label>
          <Textarea
            disabled={!isEditing}
            defaultValue={initialData?.description ?? ""}
            placeholder="Responsabilidades..."
            className="bg-[#0f0f0f] border-gray-800 focus-visible:ring-blue-500/50 min-h-[120px] resize-none disabled:opacity-70 disabled:text-gray-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Inicio</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                type="date"
                disabled={!isEditing}
                defaultValue={initialData?.start_date ?? ""}
                className="bg-[#0f0f0f] border-gray-800 pl-10 text-[10px] disabled:opacity-70"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Fin</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                type="date"
                // BLOQUEO LÓGICO: Se deshabilita si no estamos editando O si el checkbox está marcado
                disabled={!isEditing || isCurrentWork}
                defaultValue={
                  isCurrentWork ? "" : (initialData?.end_date ?? "")
                }
                className="bg-[#0f0f0f] border-gray-800 pl-10 text-[10px] disabled:opacity-50 disabled:grayscale-[0.5]"
              />
            </div>
          </div>
        </div>

        <div
          className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
            isCurrentWork
              ? "bg-blue-600/10 border-blue-600/30"
              : "bg-gray-900/30 border-gray-800"
          }`}
        >
          <Checkbox
            id="current"
            disabled={!isEditing}
            checked={isCurrentWork}
            onCheckedChange={(checked) => setIsCurrentWork(checked as boolean)}
            className="border-gray-600 data-[state=checked]:bg-blue-600"
          />
          <label
            htmlFor="current"
            className={`text-sm cursor-pointer select-none ${isCurrentWork ? "text-blue-400 font-medium" : "text-gray-400"}`}
          >
            Actualmente trabajo aquí
          </label>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-800 flex flex-col gap-3">
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
              className="text-red-500 hover:text-white hover:bg-red-600 font-bold gap-2"
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
              className="w-full text-gray-500 hover:text-white hover:bg-gray-800"
            >
              Cancelar
            </Button>
          </>
        )}
      </div>
    </aside>
  );
}
