import { ACHIEVEMENT_THEME } from "@/modules/core/data/theme.modules";
import type { Achievement } from "@/modules/core/data/dashboard.types";

export function AchievementPreview({
  achievements,
}: {
  achievements: Achievement[];
}) {
  return (
    <div className="space-y-3">
      {achievements.slice(0, 3).map((ach) => {
        const config =
          ACHIEVEMENT_THEME[ach.type as keyof typeof ACHIEVEMENT_THEME];
        const Icon = config.icon;
        return (
          <div key={ach.id} className="flex items-center gap-3 p-1">
            <div
              className={`p-1.5 rounded border border-white/5 ${config.theme.bgStrong}`}
            >
              <Icon className={`w-3.5 h-3.5 ${config.theme.text}`} />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-medium text-gray-200 truncate">
                {ach.title}
              </h4>
              <p className="text-[10px] text-gray-500 uppercase font-bold">
                {ach.type} •{" "}
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
