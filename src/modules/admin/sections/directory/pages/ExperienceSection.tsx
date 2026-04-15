import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { SectionLayout } from "@/components/custom/SectionLayout";
import { Loader2, ArrowLeft, Briefcase } from "lucide-react";
import { ExperienceCard } from "@/components/custom/ExperienceCard";
import { ViewExperienceModal } from "@/components/custom/ViewExperienceModal";
import { useExperienceStore } from "@/modules/core/store/experience.store";
import { useUserStore } from "@/modules/core/store/user.store";
import type { Experience } from "@/modules/experiences/models/experience.model";

export default function ExperienceSection() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { experiences, isLoading, fetchExperiences } = useExperienceStore();
  const { usersList, user: admin } = useUserStore();

  // Estado para controlar el modal de visualización
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

  // 1. Buscamos al usuario objetivo
  const targetUser = useMemo(() => {
    return usersList.find((u) => u.id === Number(id));
  }, [usersList, id]);

  // 2. Cargamos las experiencias
  useEffect(() => {
    const controller = new AbortController();
    if (targetUser?.email) {
      fetchExperiences(targetUser.email, controller.signal);
    }
    return () => controller.abort();
  }, [targetUser?.email, fetchExperiences]);

  // 3. Ordenamos las experiencias (Timeline)
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

  if (!admin) return null;

  return (
    <SectionLayout
      user={admin}
      title={targetUser ? `Experiencia de ${targetUser.names}` : "Cargando..."}
      subtitle="Historial profesional y académico detallado"
      showButton={false}
    >
      {/* Botón de retroceso */}
      <div className="mb-6 flex">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-all group py-1 pr-4"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Volver al perfil</span>
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500 gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="font-medium animate-pulse tracking-widest uppercase text-xs">
            Sincronizando trayectoria...
          </p>
        </div>
      ) : (
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          {sortedExperiences.length > 0 && (
            <div className="absolute left-5.75 top-4 bottom-10 w-0.5 bg-gradient-to-b from-blue-600 via-gray-800 to-transparent" />
          )}

          <div className="space-y-8 pb-20">
            {sortedExperiences.length > 0 ? (
              sortedExperiences.map((exp) => (
                <ExperienceCard
                  key={exp.id}
                  exp={exp}
                  onClick={() => setSelectedExp(exp)}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-900 rounded-3xl bg-gray-900/10">
                <Briefcase className="w-8 h-8 text-gray-700 mb-4" />
                <p className="text-gray-600 font-medium text-sm">
                  Este usuario no ha registrado experiencias aún.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de visualización de solo lectura */}
      <ViewExperienceModal
        isOpen={!!selectedExp}
        onClose={() => setSelectedExp(null)}
        exp={selectedExp}
      />
    </SectionLayout>
  );
}
