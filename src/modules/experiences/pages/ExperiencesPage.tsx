import { useState, useMemo, useEffect } from "react";
import { SectionLayout } from "@/components/custom/SectionLayout";
import { ExperienceFormAside } from "@/modules/experiences/components/ExperienceFormAside";
import { ExperienceCard } from "@/modules/experiences/components/ExperienceCard";
import { useUserStore } from "@/modules/core/store/user.store";
import { useExperienceStore } from "@/modules/core/store/experience.store";
import type { Experience } from "@/modules/experiences/models/experience.model";

export default function ExperiencesPage() {
  const { user } = useUserStore();
  const { experiences, fetchMyExperiences, isLoading } = useExperienceStore();

  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchMyExperiences();

    return () => controller.abort();
  }, [fetchMyExperiences]);

  const sortedExperiences = useMemo(() => {
    return [...experiences].sort((a, b) => {
      const isCurrentA = !a.end_date;
      const isCurrentB = !b.end_date;

      if (isCurrentA && !isCurrentB) return -1;
      if (!isCurrentA && isCurrentB) return 1;

      const timeA = a.start_date ? new Date(a.start_date).getTime() : 0;
      const timeB = b.start_date ? new Date(b.start_date).getTime() : 0;

      return timeB - timeA;
    });
  }, [experiences]);

  if (!user) return null;

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
      user={user as any}
      title="Experiencias"
      subtitle="Historial profesional y académico"
      buttonLabel="Nueva Experiencia"
      onButtonClick={handleCreateNew}
      showButton={!isAsideOpen}
    >
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-5.75 top-4 bottom-10 w-0.5 bg-linear-to-b from-blue-600 via-gray-800 to-transparent" />

        <div className="space-y-8 pb-20">
          {isLoading && experiences.length === 0 ? (
            <p className="text-center text-gray-500 animate-pulse">
              Cargando experiencias...
            </p>
          ) : sortedExperiences.length > 0 ? (
            sortedExperiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                exp={exp}
                onClick={() => handleSelectExperience(exp)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">
              No hay experiencias registradas.
            </p>
          )}
        </div>
      </div>

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
