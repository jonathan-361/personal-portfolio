import { useState, useEffect } from "react";
import { SectionLayout } from "@/components/custom/SectionLayout";
import { StatCard } from "@/modules/home/components/StatCard";
import { HomeCardSection } from "@/modules/home/components/HomeSectionCard";

import { NotePreview } from "@/modules/home/components/NotePreview";
import { TaskPreview } from "../components/TaskPreview";
import { AchievementPreview } from "@/modules/home/components/AchievementPreview";
import { ExperiencePreview } from "@/modules/home/components/ExperiencePreview";

import { useUserStore } from "@/modules/core/store/user.store";
import { useNoteStore } from "@/modules/core/store/note.store";
import { useTaskStore } from "@/modules/core/store/task.store";
import { useAchievementStore } from "@/modules/core/store/achievement.store";
import { useExperienceStore } from "@/modules/core/store/experience.store";
import { userService } from "@/modules/core/services/user-services/user.services";
import paths from "@/modules/core/routes/paths/path";
import { getFirstNameLastName } from "@/lib/getFirstNameLastName";

export default function HomePage() {
  const { user, setUser } = useUserStore();
  const { notes, fetchMyNotes } = useNoteStore();
  const { tasks, fetchMyTasks } = useTaskStore();
  const { achievements, fetchMyAchievements } = useAchievementStore();
  const { experiences, fetchMyExperiences } = useExperienceStore();

  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    const controller = new AbortController();

    const loadData = async () => {
      try {
        await Promise.all([
          !user
            ? userService.getMe(controller.signal).then(setUser)
            : Promise.resolve(),
          fetchMyNotes(),

          fetchMyTasks(),
          fetchMyAchievements(),
          fetchMyExperiences(),
        ]);
      } catch (error: any) {
        if (error.name !== "CanceledError" && error.name !== "AbortError") {
          console.error("Error cargando estadísticas:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
    return () => controller.abort();
  }, [
    setUser,
    user,
    fetchMyNotes,
    fetchMyTasks,
    fetchMyAchievements,
    fetchMyExperiences,
  ]);

  const currentExp = experiences.find((e) => !e.end_date);

  if (loading && !user) {
    return (
      <div className="bg-[#0a0a0a] h-screen flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 animate-pulse">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const formattedName = getFirstNameLastName(user as any);

  return (
    <SectionLayout
      user={user as any}
      title={`Hola, ${formattedName}`}
      subtitle={user.email}
      showButton={false}
    >
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Notas"
            value={notes.length ?? notes.length}
            type="notes"
          />

          <StatCard
            title="Logros"
            value={achievements.length ?? achievements.length}
            type="achievements"
          />
          <StatCard
            title="Tareas"
            value={tasks.length ?? tasks.length}
            type="tasks"
          />

          <StatCard
            title="Experiencia"
            value={experiences.length ?? experiences.length}
            type="experiences"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <HomeCardSection title="Notas Recientes" path={paths.notes}>
            <NotePreview notes={notes} />
          </HomeCardSection>

          <HomeCardSection title="Próximas Tareas" path={paths.tasks}>
            <TaskPreview tasks={tasks} />
          </HomeCardSection>

          <HomeCardSection title="Logros Recientes" path={paths.achievement}>
            <AchievementPreview achievements={achievements} />
          </HomeCardSection>

          <HomeCardSection title="Experiencia Actual" path={paths.experiences}>
            <ExperiencePreview currentExp={currentExp} />
          </HomeCardSection>
        </div>
      </div>
    </SectionLayout>
  );
}
