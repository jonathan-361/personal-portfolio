// @/modules/home/components/AchievementPreview.tsx
import { ACHIEVEMENT_THEME } from "@/modules/core/data/theme.modules";
import type { Achievement } from "@/modules/achievements/models/achievement.model";

interface AchievementPreviewProps {
  achievements: Achievement[];
}

export function AchievementPreview({ achievements }: AchievementPreviewProps) {
  if (achievements.length === 0) {
    return (
      <p className="text-xs text-gray-600 italic p-1">
        No hay logros registrados.
      </p>
    );
  }

  // 1. Ordenamos por fecha (más reciente primero) y luego tomamos 3
  const recentAchievements = [...achievements]
    .sort((a, b) => {
      const dateA = new Date(a.achieved_at).getTime();
      const dateB = new Date(b.achieved_at).getTime();
      return dateB - dateA; // Descendente: de más nuevo a más viejo
    })
    .slice(0, 3);

  return (
    <div className="space-y-3">
      {recentAchievements.map((ach) => {
        const rawType = ach.achievement_type;

        const themeMap: Record<string, keyof typeof ACHIEVEMENT_THEME> = {
          ACADEMICO: "Académico",
          PROFESIONAL: "Profesional",
          PERSONAL: "Personal",
        };

        const themeKey = themeMap[rawType] || "Personal";
        const config = ACHIEVEMENT_THEME[themeKey];
        const Icon = config.icon;

        return (
          <div key={ach.id} className="flex items-center gap-3 p-1 group">
            <div
              className={`p-1.5 rounded border border-white/5 ${config.theme.bgStrong} transition-colors group-hover:border-white/10`}
            >
              <Icon className={`w-3.5 h-3.5 ${config.theme.text}`} />
            </div>

            <div className="min-w-0">
              <h4 className="text-sm font-medium text-gray-200 truncate group-hover:text-white transition-colors">
                {ach.title}
              </h4>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">
                {config.label} •{" "}
                {ach.achieved_at
                  ? new Date(ach.achieved_at).getFullYear()
                  : "2026"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
