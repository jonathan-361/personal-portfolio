import { AchievementCard } from "../components/AchievementCard";
import { achievementsMock } from "@/modules/core/data/dashboard.data";

export function ProfessionalSection() {
  const data = achievementsMock.filter((a) => a.type === "Profesional");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((item) => (
        <AchievementCard key={item.id} achievement={item} onClick={() => {}} />
      ))}
    </div>
  );
}
