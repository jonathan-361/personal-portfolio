import { useState, useMemo } from "react";
import { SectionLayout } from "@/components/custom/SectionLayout";
import { ExperienceFormAside } from "../components/ExperienceFormAside";
import { ExperienceCard } from "../components/ExperienceCard";
import { userMock, experiencesMock } from "@/modules/core/data/dashboard.data";
import type { User, Experience } from "@/modules/core/data/dashboard.types";

export default function ExperiencesPage() {
  const [user] = useState<User>(userMock);
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);

  const sortedExperiences = useMemo(() => {
    return [...experiencesMock].sort((a, b) => {
      const timeA = a.start_date ? new Date(a.start_date).getTime() : 0;
      const timeB = b.start_date ? new Date(b.start_date).getTime() : 0;
      return timeB - timeA;
    });
  }, []);

  const handleCreateNew = () => {
    setSelectedExperience(null);
    setIsAsideOpen(true);
  };

  const handleSelectExperience = (exp: Experience) => {
    setSelectedExperience(exp);
    setIsAsideOpen(true);
  };

  return (
    <SectionLayout
      user={user}
      title="Experiencias"
      subtitle="Historial profesional y académico"
      buttonLabel="Nueva Experiencia"
      onButtonClick={handleCreateNew}
      showButton={!isAsideOpen}
    >
      <div className="relative max-w-4xl mx-auto">
        {/* Línea de tiempo */}
        <div className="absolute left-5.75 top-4 bottom-10 w-0.5 bg-linear-to-b from-blue-600 via-gray-800 to-transparent" />

        <div className="space-y-8 pb-20">
          {sortedExperiences.map((exp) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              onClick={() => handleSelectExperience(exp)}
            />
          ))}
        </div>
      </div>

      {/* Formulario Lateral */}
      {isAsideOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
          <ExperienceFormAside
            initialData={selectedExperience}
            onCancel={() => setIsAsideOpen(false)}
            onSave={() => setIsAsideOpen(false)}
          />
        </div>
      )}
    </SectionLayout>
  );
}
