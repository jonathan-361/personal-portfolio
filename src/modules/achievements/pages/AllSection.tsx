import { AchievementCard } from "../components/AchievementCard";
import { useAchievementStore } from "@/modules/core/store/achievement.store";
import type { AchievementResponse } from "@/modules/achievements/models/achievement.model";

interface SectionProps {
  onEdit: (achievement: AchievementResponse) => void;
}

export function AllSection({ onEdit }: SectionProps) {
  const { achievements } = useAchievementStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {achievements.map((achievement) => (
        <AchievementCard
          key={achievement.id}
          achievement={achievement}
          onClick={() => onEdit(achievement)}
        />
      ))}
    </div>
  );
}
