import { useState } from "react";
import type { User, Achievement } from "@/modules/core/data/dashboard.types";
import { userMock, achievementsMock } from "@/modules/core/data/dashboard.data";
import { ACHIEVEMENT_THEME } from "@/modules/core/data/theme.modules";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionLayout } from "@/components/custom/SectionLayout";
import { AchievementCard } from "../components/AchievementCard";
import { AchievementFormAside } from "../components/AchievementFormAside";
import { Trophy } from "lucide-react";

export default function AchievementsPage() {
  const [user] = useState<User>(userMock);
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  const getFilteredAchievements = (tabValue: string) => {
    if (tabValue === "all") return achievementsMock;

    const catMap: Record<string, string> = {
      academic: ACHIEVEMENT_THEME.Académico.label,
      professional: ACHIEVEMENT_THEME.Profesional.label,
      personal: ACHIEVEMENT_THEME.Personal.label,
    };

    return achievementsMock.filter((a) => a.type === catMap[tabValue]);
  };

  const handleOpenAside = (achievement: Achievement | null = null) => {
    setSelectedAchievement(achievement);
    setIsAsideOpen(true);
  };

  const handleCloseAside = () => {
    setIsAsideOpen(false);
    setSelectedAchievement(null);
  };

  return (
    <SectionLayout
      user={user}
      title="Logros"
      subtitle={`${achievementsMock.length} hitos registrados`}
      buttonLabel="Nuevo Logro"
      onButtonClick={() => handleOpenAside(null)}
      showButton={!isAsideOpen}
    >
      <div className="max-w-5xl mx-auto mt-2 pb-20">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900/50 border border-gray-800 p-1 h-12">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-purple-600 text-gray-400 font-bold data-[state=active]:text-white transition-all hover:text-white"
            >
              Todo
            </TabsTrigger>
            <TabsTrigger
              value="academic"
              className="data-[state=active]:bg-blue-600 text-gray-400 font-bold data-[state=active]:text-white transition-all hover:text-white"
            >
              {ACHIEVEMENT_THEME.Académico.label}
            </TabsTrigger>
            <TabsTrigger
              value="professional"
              className="data-[state=active]:bg-emerald-600 text-gray-400 font-bold data-[state=active]:text-white transition-all hover:text-white"
            >
              {ACHIEVEMENT_THEME.Profesional.label}
            </TabsTrigger>
            <TabsTrigger
              value="personal"
              className="data-[state=active]:bg-amber-600 text-gray-400 font-bold data-[state=active]:text-white transition-all hover:text-white"
            >
              {ACHIEVEMENT_THEME.Personal.label}
            </TabsTrigger>
          </TabsList>

          {["all", "academic", "professional", "personal"].map((id) => (
            <TabsContent
              key={id}
              value={id}
              className="mt-8 outline-none animate-in fade-in duration-500"
            >
              {getFilteredAchievements(id).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getFilteredAchievements(id).map((ach) => (
                    <AchievementCard
                      key={ach.id}
                      achievement={ach}
                      onClick={() => handleOpenAside(ach)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 border-2 border-dashed border-gray-800/50 rounded-3xl bg-gray-900/10">
                  <div className="bg-gray-800/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-10 h-10 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-400">
                    Sin registros
                  </h3>
                  <p className="text-gray-600 mt-2 max-w-xs mx-auto">
                    Aún no has añadido hitos en la categoría de{" "}
                    {id === "all" ? "logros" : id}.
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {isAsideOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={handleCloseAside}
        >
          <div className="h-full" onClick={(e) => e.stopPropagation()}>
            <AchievementFormAside
              initialData={selectedAchievement}
              onCancel={handleCloseAside}
              onSave={handleCloseAside}
            />
          </div>
        </div>
      )}
    </SectionLayout>
  );
}
