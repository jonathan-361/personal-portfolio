import { useState } from "react";
import { SectionLayout } from "@/components/custom/SectionLayout";
import { StatCard } from "@/modules/home/components/StatCard";
import { HomeCardSection } from "@/modules/home/components/HomeSectionCard";

import { NotePreview } from "../components/NotePreview";
import { TaskPreview } from "../components/TaskPreview";
import { AchievementPreview } from "../components/AchievementPreview";
import { ExperiencePreview } from "../components/ExperiencePreview";

import {
  userMock,
  notesMock,
  achievementsMock,
  tasksMock,
  experiencesMock,
} from "@/modules/core/data/dashboard.data";

import type { User } from "@/modules/core/data/dashboard.types";
import paths from "@/modules/core/routes/paths/path";

export default function HomePage() {
  const [user] = useState<User>(userMock);
  const currentExp = experiencesMock.find((e) => !e.end_date);

  return (
    <SectionLayout
      user={user}
      title={`Hola, ${user.first_name} ${user.last_name}`}
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

        {/* Secciones Detalladas */}
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
