import { Calendar } from "lucide-react";
import { ACHIEVEMENT_THEME } from "@/modules/core/data/theme.modules";
import type { AchievementResponse } from "@/modules/achievements/models/achievement.model";

interface AchievementCardProps {
  achievement: AchievementResponse;
  onClick: () => void;
}

export function AchievementCard({
  achievement,
  onClick,
}: AchievementCardProps) {
  // Mapeamos el Enum de la DB al label que usa tu objeto ACHIEVEMENT_THEME
  const typeMap: Record<string, string> = {
    ACADEMICO: "Académico",
    PROFESIONAL: "Profesional",
    PERSONAL: "Personal",
  };

  const themeKey = typeMap[achievement.achievement_type] || "Personal";
  const config = ACHIEVEMENT_THEME[themeKey as keyof typeof ACHIEVEMENT_THEME];
  const Icon = config.icon;

  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden p-6 rounded-2xl transition-all duration-300 cursor-pointer group shadow-xl flex flex-col h-full
        bg-gradient-to-br from-gray-900/40 ${config.theme.gradient} border ${config.theme.border} border-t-4 ${config.theme.topBorder}
        hover:shadow-2xl hover:scale-[1.01] hover:bg-gray-800/40
      `}
    >
      <div className="flex justify-between items-start gap-4 mb-4 relative z-10">
        <div
          className={`p-3 rounded-xl ${config.theme.bg} border ${config.theme.iconBorder} transition-transform group-hover:scale-110 duration-300`}
        >
          <Icon className={`w-6 h-6 ${config.theme.text}`} />
        </div>
        <div className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-black/40 border border-white/5 text-gray-400 uppercase tracking-widest shrink-0 backdrop-blur-md">
          {themeKey}
        </div>
      </div>

      <div className="flex-1 relative z-10">
        <h3
          className={`text-xl font-bold text-white transition-colors duration-300 line-clamp-2 ${config.theme.textHover}`}
        >
          {achievement.title}
        </h3>
        <p className="text-gray-400/80 text-sm mt-3 line-clamp-3 leading-relaxed border-l-2 border-white/10 pl-4 italic group-hover:border-white/20 transition-colors">
          {achievement.description || "Sin descripción adicional."}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-tighter relative z-10">
        <Calendar className="w-3.5 h-3.5" />
        <span>
          {/* Formateamos la fecha si viene de la DB o mostramos fallback */}
          {achievement.achieved_at
            ? new Date(achievement.achieved_at).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "Fecha no especificada"}
        </span>
      </div>
    </div>
  );
}
