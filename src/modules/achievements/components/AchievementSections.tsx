import { AchievementCard } from "../components/AchievementCard";
import { useAchievementStore } from "@/modules/core/store/achievement.store";
import type { AchievementResponse } from "@/modules/achievements/models/achievement.model";

interface AchievementSectionsProps {
  onEdit: (achievement: AchievementResponse) => void;
  filterType: "ALL" | "ACADEMICO" | "PROFESIONAL" | "PERSONAL";
}

export function AchievementSections({
  onEdit,
  filterType,
}: AchievementSectionsProps) {
  const { achievements } = useAchievementStore();
  const data = [...achievements]
    .filter((ach) => {
      if (filterType === "ALL") return true;
      return ach.achievement_type === filterType;
    })
    .sort((a, b) => {
      const dateA = new Date(a.achieved_at).getTime();
      const dateB = new Date(b.achieved_at).getTime();
      return dateB - dateA;
    });

  if (data.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 italic">
        No hay logros registrados en esta categoría.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((item) => (
        <AchievementCard
          key={item.id}
          achievement={item}
          onClick={() => onEdit(item)}
        />
      ))}
    </div>
  );
}
