import { Calendar, Award } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Achievement } from "@/modules/achievements/models/achievement.model";
import { ACHIEVEMENT_THEME } from "@/modules/core/data/theme.modules";

interface ViewAchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievement: Achievement | null;
}

export function ViewAchievementModal({
  isOpen,
  onClose,
  achievement,
}: ViewAchievementModalProps) {
  if (!achievement) return null;

  // Mapa de normalización de tipos DB -> Claves de ACHIEVEMENT_THEME
  const typeMap: Record<string, keyof typeof ACHIEVEMENT_THEME> = {
    ACADEMICO: "Académico",
    PROFESIONAL: "Profesional",
    PERSONAL: "Personal",
  };

  const themeKey = typeMap[achievement.achievement_type] || "Personal";
  const config = ACHIEVEMENT_THEME[themeKey];
  const Icon = config.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-[#050505] border-gray-800 text-white shadow-2xl p-0 overflow-hidden focus:outline-none">
        {/* Banner Superior Decorativo */}
        <div
          className={`h-1.5 w-full ${config.theme.bgStrong || "bg-purple-500"}`}
        />

        {/* Botón de cerrar personalizado (opcional, ya que Dialog incluye uno) */}
        <div className="p-8">
          <DialogHeader className="space-y-4">
            <div className="flex items-center justify-between">
              {/* Badge de Categoría */}
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full border ${config.theme.border} ${config.theme.bg} ${config.theme.text} text-[10px] font-bold uppercase tracking-widest`}
              >
                <Icon className="w-3 h-3" />
                {themeKey}
              </div>

              {/* Fecha */}
              <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {new Date(achievement.achieved_at).toLocaleDateString(
                    "es-ES",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                </span>
              </div>
            </div>

            {/* Título del Logro */}
            <DialogTitle className="text-2xl font-bold leading-tight text-white pr-6">
              {achievement.title}
            </DialogTitle>

            <DialogDescription className="sr-only">
              Detalles del logro seleccionado
            </DialogDescription>
          </DialogHeader>

          {/* Contenido Principal */}
          <div className="mt-8 relative">
            {/* Icono de fondo decorativo */}
            <Award
              className={`absolute -right-4 -top-8 w-24 h-24 ${config.theme.text} opacity-10 rotate-12`}
            />

            <div className="relative z-10 space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Descripción
              </h4>
              <div className="max-h-[35vh] overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-wrap italic border-l-2 border-gray-800 pl-4">
                  {achievement.description || "Sin descripción disponible."}
                </p>
              </div>
            </div>
          </div>

          {/* Espaciador final para estética */}
          <div className="mt-6" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
