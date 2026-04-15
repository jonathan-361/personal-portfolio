import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Search, Loader2, ArrowLeft } from "lucide-react";

import { SectionLayout } from "@/components/custom/SectionLayout";
import { CustomAside } from "@/components/custom/CustomAside";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { AchievementCard } from "@/components/custom/AchievementCard";
import { ViewAchievementModal } from "@/components/custom/ViewAchievementModal";

import { useAchievementStore } from "@/modules/core/store/achievement.store";
import { useUserStore } from "@/modules/core/store/user.store";
import type { Achievement } from "@/modules/achievements/models/achievement.model";

export default function AchievementSection() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Stores
  const { achievements, isLoading, fetchAchievements } = useAchievementStore();
  const { user: admin, usersList } = useUserStore();

  // Estados locales
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Obtenemos el usuario de la lista ya cargada en el store para sacar el email
  const targetUser = useMemo(() => {
    return usersList.find((u) => u.id === Number(id));
  }, [usersList, id]);

  useEffect(() => {
    // Si tenemos el email del usuario, traemos sus logros inmediatamente
    if (targetUser?.email) {
      fetchAchievements(targetUser.email);
    }
  }, [targetUser?.email, fetchAchievements]);

  // Filtrado lógico
  const filteredData = useMemo(() => {
    return achievements.filter((ach) => {
      const matchesSearch =
        ach.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ach.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filter === "ALL" || ach.achievement_type === filter;
      return matchesSearch && matchesType;
    });
  }, [achievements, searchQuery, filter]);

  if (!admin) return null;

  return (
    <SectionLayout
      user={admin as any}
      title={
        targetUser ? `Logros de ${targetUser.names}` : "Logros del Usuario"
      }
      subtitle={targetUser?.email || ""}
      sidebarSecondary={
        <CustomAside isFloating={false} width="w-80">
          <div className="flex flex-col gap-8 p-4">
            <div className="space-y-3">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2">
                Búsqueda
              </p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  className="bg-[#0f0f0f] border-gray-800 text-white pl-10 focus:ring-purple-500"
                  placeholder="Título o contenido..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest px-2">
                Filtrar por
              </p>
              <RadioGroup
                value={filter}
                onValueChange={setFilter}
                className="gap-2"
              >
                <FilterOption id="ALL" label="Todos" color="bg-purple-500" />
                <FilterOption
                  id="ACADEMICO"
                  label="Académicos"
                  color="bg-blue-500"
                />
                <FilterOption
                  id="PROFESIONAL"
                  label="Profesionales"
                  color="bg-emerald-500"
                />
                <FilterOption
                  id="PERSONAL"
                  label="Personales"
                  color="bg-amber-500"
                />
              </RadioGroup>
            </div>
          </div>
        </CustomAside>
      }
    >
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-all group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Volver al expediente</span>
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500 gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
          <p className="font-medium animate-pulse">Cargando logros...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {filteredData.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              onClick={() => {
                setSelectedAchievement(achievement);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <ViewAchievementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        achievement={selectedAchievement}
      />
    </SectionLayout>
  );
}

function FilterOption({
  id,
  label,
  color,
}: {
  id: string;
  label: string;
  color: string;
}) {
  return (
    <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-900/50 cursor-pointer group transition-colors border border-transparent hover:border-gray-800">
      <RadioGroupItem
        value={id}
        id={id}
        className="border-gray-600 text-purple-500"
      />
      <Label
        htmlFor={id}
        className="flex-1 flex items-center gap-3 text-sm text-gray-400 group-hover:text-white cursor-pointer font-medium"
      >
        <span className={`w-1.5 h-5 rounded-full ${color}`} />
        {label}
      </Label>
    </div>
  );
}
