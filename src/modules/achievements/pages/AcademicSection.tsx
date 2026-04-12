import { AchievementCard } from "../components/AchievementCard";
import { useAchievementStore } from "@/modules/core/store/achievement.store";
import type { AchievementResponse } from "@/modules/achievements/models/achievement.model";

interface SectionProps {
  onEdit: (achievement: AchievementResponse) => void;
}

export function AcademicSection({ onEdit }: SectionProps) {
  const { achievements } = useAchievementStore();
  const data = achievements.filter((a) => a.achievement_type === "ACADEMICO");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
