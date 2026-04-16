import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { SectionLayout } from "@/components/custom/SectionLayout";
import { Loader2, ArrowLeft, Briefcase, Search, X } from "lucide-react";
import { ExperienceCard } from "@/components/custom/ExperienceCard";
import { ViewExperienceModal } from "@/components/custom/ViewExperienceModal";
import { useExperienceStore } from "@/modules/core/store/experience.store";
import { useUserStore } from "@/modules/core/store/user.store";
import { Input } from "@/components/ui/input";
import type { Experience } from "@/modules/experiences/models/experience.model";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ExperienceSection() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { experiences, isLoading, fetchExperiences } = useExperienceStore();
  const { usersList, user: admin } = useUserStore();

  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const targetUser = useMemo(() => {
    return usersList.find((u) => u.id === Number(id));
  }, [usersList, id]);

  useEffect(() => {
    const controller = new AbortController();
    if (targetUser?.email) {
      fetchExperiences(targetUser.email, controller.signal);
    }
    return () => controller.abort();
  }, [targetUser?.email, fetchExperiences]);

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

  const filteredExperiences = useMemo(() => {
    if (!searchTerm.trim()) return sortedExperiences;

    const lowerTerm = searchTerm.toLowerCase();
    return sortedExperiences.filter(
      (exp) =>
        exp.position.toLowerCase().includes(lowerTerm) ||
        exp.company.toLowerCase().includes(lowerTerm),
    );
  }, [sortedExperiences, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredExperiences.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentExperiences = filteredExperiences.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  if (!admin) return null;

  return (
    <SectionLayout
      user={admin}
      title={targetUser ? `Experiencia de ${targetUser.names}` : "Cargando..."}
      subtitle="Historial profesional y académico detallado"
      showButton={false}
    >
      <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-all group py-1 pr-4 self-start"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Volver al perfil</span>
        </button>

        <div className="relative w-full sm:w-80 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
          <Input
            placeholder="Buscar por cargo o empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-9 bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-600 focus-visible:ring-blue-600/50 focus-visible:border-blue-600/50"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500 gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="font-medium animate-pulse tracking-widest uppercase text-xs">
            Sincronizando trayectoria...
          </p>
        </div>
      ) : (
        <div className="relative max-w-4xl mx-auto flex flex-col gap-10">
          <div className="relative">
            {/* Línea de tiempo decorativa */}
            {currentExperiences.length > 0 && (
              <div className="absolute left-5.75 top-4 bottom-10 w-0.5 bg-gradient-to-b from-blue-600 via-gray-800 to-transparent" />
            )}

            <div className="space-y-8">
              {currentExperiences.length > 0 ? (
                currentExperiences.map((exp) => (
                  <ExperienceCard
                    key={exp.id}
                    exp={exp}
                    onClick={() => setSelectedExp(exp)}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-900 rounded-3xl bg-gray-900/10 transition-all">
                  <Briefcase className="w-8 h-8 text-gray-700 mb-4" />
                  <p className="text-gray-600 font-medium text-sm text-center px-4">
                    {searchTerm
                      ? `No se encontraron resultados para "${searchTerm}"`
                      : "Este usuario no ha registrado experiencias aún."}
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="mt-4 text-blue-500 hover:underline text-xs"
                    >
                      Limpiar búsqueda
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Componente de Paginación */}
          {totalPages > 1 && (
            <div className="pb-20">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer text-gray-400 hover:text-white hover:bg-gray-900"
                      }
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    />
                  </PaginationItem>

                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem
                      key={i + 1}
                      className="hidden sm:inline-block"
                    >
                      <PaginationLink
                        isActive={currentPage === i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className="cursor-pointer border-gray-800 text-gray-400 aria-[current]:bg-blue-600 aria-[current]:text-white"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer text-gray-400 hover:text-white hover:bg-gray-900"
                      }
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      )}

      <ViewExperienceModal
        isOpen={!!selectedExp}
        onClose={() => setSelectedExp(null)}
        exp={selectedExp}
      />
    </SectionLayout>
  );
}
