import { useState, useMemo } from "react";
import { Sidebar } from "@/components/custom/Sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { userMock, experiencesMock } from "@/modules/core/data/dashboard.data";
import { ExperienceFormAside } from "../components/ExperienceFormAside";
import { ExperienceCard } from "../components/ExperienceCard";
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

  const handleCloseAside = () => {
    setIsAsideOpen(false);
    setSelectedExperience(null);
  };

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] text-white font-sans overflow-hidden">
      <Sidebar user={user} />

      <main className="flex-1 flex flex-col min-w-0 bg-[#0a0a0a]">
        <header className="sticky top-0 z-10 flex items-center justify-between p-8 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-900/50">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Experiencias</h1>
            <p className="text-sm text-gray-500">
              Historial profesional y académico
            </p>
          </div>

          {!isAsideOpen && (
            <Button
              onClick={handleCreateNew}
              className="bg-white text-black hover:bg-gray-200 font-bold gap-2 px-6 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              Nueva Experiencia
            </Button>
          )}
        </header>

        <div className="flex-1 overflow-y-auto p-8 pt-4 custom-scrollbar">
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-[23px] top-4 bottom-10 w-[2px] bg-gradient-to-b from-blue-600 via-gray-800 to-transparent" />

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
        </div>
      </main>

      {isAsideOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
          <ExperienceFormAside
            initialData={selectedExperience}
            onCancel={handleCloseAside}
            onSave={handleCloseAside}
          />
        </div>
      )}
    </div>
  );
}
