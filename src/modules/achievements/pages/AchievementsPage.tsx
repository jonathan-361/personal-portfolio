import { useEffect, useState } from "react";
import { useUserStore } from "@/modules/core/store/user.store";
import { useAchievementStore } from "@/modules/core/store/achievement.store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionLayout } from "@/components/custom/SectionLayout";
import { AchievementSections } from "@/modules/achievements/components/AchievementSections";
import { AchievementFormAside } from "@/modules/achievements/components/AchievementFormAside";
import { ACHIEVEMENT_THEME } from "@/modules/core/data/theme.modules";
import { Loader2 } from "lucide-react";
import type { AchievementResponse } from "@/modules/achievements/models/achievement.model";

export default function AchievementsPage() {
  const { user } = useUserStore();
  const { achievements, isLoading, fetchAchievements } = useAchievementStore();

  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] =
    useState<AchievementResponse | null>(null);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  if (!user) return null;

  const handleOpenAside = (achievement: AchievementResponse | null = null) => {
    setSelectedAchievement(achievement);
    setIsAsideOpen(true);
  };

  const handleCloseAside = () => {
    setIsAsideOpen(false);
    setSelectedAchievement(null);
  };

  return (
    <SectionLayout
      user={user as any}
      title="Logros"
      subtitle={`${achievements.length} hitos registrados`}
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

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
              <p className="text-gray-500 font-medium">
                Cargando tus logros...
              </p>
            </div>
          ) : (
            <>
              <TabsContent
                value="all"
                className="mt-8 outline-none animate-in fade-in duration-500"
              >
                <AchievementSections
                  filterType="ALL"
                  onEdit={handleOpenAside}
                />
              </TabsContent>

              <TabsContent
                value="academic"
                className="mt-8 outline-none animate-in fade-in duration-500"
              >
                <AchievementSections
                  filterType="ACADEMICO"
                  onEdit={handleOpenAside}
                />
              </TabsContent>

              <TabsContent
                value="professional"
                className="mt-8 outline-none animate-in fade-in duration-500"
              >
                <AchievementSections
                  filterType="PROFESIONAL"
                  onEdit={handleOpenAside}
                />
              </TabsContent>

              <TabsContent
                value="personal"
                className="mt-8 outline-none animate-in fade-in duration-500"
              >
                <AchievementSections
                  filterType="PERSONAL"
                  onEdit={handleOpenAside}
                />
              </TabsContent>
            </>
          )}
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
