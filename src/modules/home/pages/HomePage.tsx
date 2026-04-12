import { useState, useEffect } from "react";
import { SectionLayout } from "@/components/custom/SectionLayout";
import { StatCard } from "@/modules/home/components/StatCard";
import { HomeCardSection } from "@/modules/home/components/HomeSectionCard";

import { NotePreview } from "../components/NotePreview";
import { TaskPreview } from "../components/TaskPreview";
import { AchievementPreview } from "../components/AchievementPreview";
import { ExperiencePreview } from "../components/ExperiencePreview";

import {
  notesMock,
  achievementsMock,
  tasksMock,
  experiencesMock,
} from "@/modules/core/data/dashboard.data";

import { userService } from "@/modules/core/services/user-services/user.services";
import { useUserStore } from "@/modules/core/store/user.store";
import paths from "@/modules/core/routes/paths/path";
import { getFirstNameLastName } from "@/lib/getFirstNameLastName";
export default function HomePage() {
  const { user, setUser } = useUserStore();
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUserData = async () => {
      try {
        const userData = await userService.getMe(controller.signal);
        setUser(userData);
      } catch (error: any) {
        if (error.name === "CanceledError" || error.name === "AbortError") {
          console.log("Petición cancelada");
        } else {
          console.error("Error en la petición:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    return () => controller.abort();
  }, [setUser]);

  const currentExp = experiencesMock.find((e) => !e.end_date);

  if (loading && !user) {
    return (
      <div className="bg-[#0a0a0a] h-screen flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 animate-pulse">Cargando perfil...</p>
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
        {/* StatCards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Notas" value={notesMock.length} type="notes" />
          <StatCard
            title="Logros"
            value={achievementsMock.length}
            type="achievements"
          />
          <StatCard title="Tareas" value={tasksMock.length} type="tasks" />
          <StatCard
            title="Experiencia"
            value={experiencesMock.length}
            type="experiences"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <HomeCardSection title="Notas Recientes" path={paths.notes}>
            <NotePreview notes={notesMock} />
          </HomeCardSection>

          <HomeCardSection title="Próximas Tareas" path={paths.tasks}>
            <TaskPreview tasks={tasksMock} />
          </HomeCardSection>

          <HomeCardSection title="Logros Recientes" path={paths.achievement}>
            <AchievementPreview achievements={achievementsMock} />
          </HomeCardSection>

          <HomeCardSection title="Experiencia Actual" path={paths.experiences}>
            <ExperiencePreview currentExp={currentExp} />
          </HomeCardSection>
        </div>
      </div>
    </SectionLayout>
  );
}
