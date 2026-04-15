import { useEffect } from "react";
import { Mail, ShieldCheck, ArrowLeft } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNoteStore } from "@/modules/core/store/note.store";
import { useAchievementStore } from "@/modules/core/store/achievement.store";
import { useTaskStore } from "@/modules/core/store/task.store";
import { useExperienceStore } from "@/modules/core/store/experience.store";

import { HomeCardSection } from "@/components/custom/HomeCardSection";
import { NotePreview } from "@/components/custom/NotePreview";
import { AchievementPreview } from "@/components/custom/AchievementPreview";
import { TaskPreview } from "@/components/custom/TaskPreview";
import { ExperiencePreview } from "@/components/custom/ExperiencePreview";
import type { User } from "@/modules/home/models/user.model";
import { getInitials } from "@/lib/getInitials";

interface InfoUserCardProps {
  targetUser: User;
  onBack: () => void;
}

export function InfoUserCard({ targetUser, onBack }: InfoUserCardProps) {
  const { notes, fetchNotes, isLoading } = useNoteStore();
  const {
    achievements,
    fetchAchievements,
    isLoading: loadingAchievements,
  } = useAchievementStore();
  const { tasks, fetchTasks, isLoading: loadingTasks } = useTaskStore();
  const {
    experiences,
    fetchExperiences,
    isLoading: loadingExperiences,
  } = useExperienceStore();

  useEffect(() => {
    if (targetUser.email) {
      fetchNotes(targetUser.email);
      fetchAchievements(targetUser.email);
      fetchTasks(targetUser.email);
      fetchExperiences(targetUser.email);
    }
  }, [targetUser.email, fetchNotes, fetchAchievements, fetchTasks]);

  const currentExperience = experiences[0];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-start">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="border-gray-800 bg-gray-900/50 text-gray-400 hover:text-white hover:bg-gray-800 hover:border-gray-700 transition-all gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al listado
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Tarjeta de Perfil */}
          <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 flex flex-col md:flex-row items-center md:items-center gap-8 flex-1 justify-center">
            <Avatar className="w-36 h-36 rounded-2xl border-2 border-white/10 shadow-xl overflow-hidden shrink-0">
              <AvatarImage
                src={targetUser.profile_image_url || undefined}
                alt={targetUser.names}
                className="object-cover w-full h-full rounded-2xl"
              />
              <AvatarFallback className="bg-indigo-700 text-4xl font-bold text-white rounded-2xl">
                {getInitials(targetUser)}
              </AvatarFallback>
            </Avatar>

            {/* Información Principal */}
            <div className="flex flex-col text-center md:text-left justify-center flex-1">
              <h2 className="text-4xl font-bold text-white mb-1 tracking-tight">
                {`${targetUser.names} ${targetUser.first_last_name} ${targetUser.second_last_name}`}
              </h2>
              <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4">
                Estudiante
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-cyan-500" />
                {targetUser.email}
              </div>
            </div>
          </div>

          {/* Información del Sistema */}
          <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              Información del Sistema
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <p className="text-xs text-gray-500 uppercase mb-1">
                  ID de Registro
                </p>
                <p className="text-white text-lg font-mono">{targetUser.id}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <p className="text-xs text-gray-500 uppercase mb-1">
                  Creación de cuenta
                </p>
                <p className="text-white text-lg">
                  {new Date(targetUser.created_at || "").toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Seccion de Notas y Logros */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <HomeCardSection title="Notas del Estudiante" path="/ono">
            {isLoading ? (
              <div className="flex justify-center py-4">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <NotePreview notes={notes} />
            )}
          </HomeCardSection>

          <HomeCardSection title="Logros del Estudiante" path="/ono">
            {loadingAchievements ? (
              <div className="flex justify-center py-6">
                <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <AchievementPreview achievements={achievements} />
            )}
          </HomeCardSection>
        </div>

        {/* Fila de tareas y experiencias */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          <HomeCardSection title="Experiencia Laboral" path="/ono">
            {loadingExperiences ? (
              <div className="flex justify-center py-4">
                <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <ExperiencePreview currentExp={currentExperience} />
            )}
          </HomeCardSection>
          <HomeCardSection title="Tareas Recientes" path="/ono">
            {loadingTasks ? (
              <div className="flex justify-center py-4">
                <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <TaskPreview tasks={tasks} />
            )}
          </HomeCardSection>
        </div>
      </div>
    </div>
  );
}
