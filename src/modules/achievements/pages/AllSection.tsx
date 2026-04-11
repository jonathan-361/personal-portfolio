import { AchievementCard } from "../components/AchievementCard";
import { achievementsMock } from "@/modules/core/data/dashboard.data";

export function AllSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {achievementsMock.map((achievement) => (
        <AchievementCard
          key={achievement.id}
          achievement={achievement} // Se pasa el objeto completo del mock
          onClick={() => console.log("Abriendo logro:", achievement.title)}
        />
      ))}
    </div>
  );
}
