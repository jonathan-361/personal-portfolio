import { useEffect, useState, useMemo } from "react";
import { SectionLayout } from "@/components/custom/SectionLayout";
import { useAuth } from "@/modules/core/context/AuthContext";
import { useUserStore } from "@/modules/core/store/user.store";
import { useNoteStore } from "@/modules/core/store/note.store";
import { useTaskStore } from "@/modules/core/store/task.store";
import { useAchievementStore } from "@/modules/core/store/achievement.store";
import { useExperienceStore } from "@/modules/core/store/experience.store";
import { userService } from "@/modules/core/services/user-services/user.services";
import { getInitials } from "@/lib/getInitials";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Mail,
  Users,
  FileText,
  CheckSquare,
  Trophy,
  Briefcase,
} from "lucide-react";
import { DIRECTORY_THEME } from "@/modules/core/data/theme.modules";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function AdminDirectoryPage() {
  const { isAuthenticated } = useAuth();

  // Stores
  const { user, usersList, pagination, setUsersData } = useUserStore();
  const { adminData: allNotes, fetchNotes } = useNoteStore();
  const { adminData: allTasks, fetchTasks } = useTaskStore();
  const { adminData: allAchievements, fetchAchievements } =
    useAchievementStore();
  const { adminData: allExperiences, fetchExperiences } = useExperienceStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      // Carga inicial de datos para conteos y tabla
      Promise.all([
        userService.getAll({ page: currentPage, limit: 10 }),
        fetchNotes(),
        fetchTasks(),
        fetchAchievements(),
        fetchExperiences(),
      ])
        .then(([resUsers]) => {
          setUsersData(resUsers.data, resUsers.pagination);
        })
        .finally(() => setIsLoading(false));
    }
  }, [
    isAuthenticated,
    currentPage,
    setUsersData,
    fetchNotes,
    fetchTasks,
    fetchAchievements,
    fetchExperiences,
  ]);

  // Filtrar para no mostrar admins en la lista
  const filteredUsers = useMemo(() => {
    return usersList.filter((u) => u.role !== "ADMIN");
  }, [usersList]);

  if (!isAuthenticated || !user) return null;

  return (
    <SectionLayout
      user={user}
      title="Directorio de Usuarios"
      subtitle="Visualiza la actividad y registros de cada estudiante"
      showButton={false}
    >
      <div className={DIRECTORY_THEME.container}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={DIRECTORY_THEME.table.header}>
                <th className="px-6 py-4 font-semibold">Estudiante</th>
                <th className="px-6 py-4 font-semibold">Contacto</th>
                <th className="px-6 py-4 font-semibold text-center">
                  Actividad Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={3}
                    className="py-20 text-center text-gray-500 animate-pulse"
                  >
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-20" />
                    Cargando información...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="py-20 text-center text-gray-500 italic"
                  >
                    No hay usuarios registrados.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  // Calculamos los totales por usuario usando adminData de los stores
                  const noteCount = allNotes.filter(
                    (n) => n.user.id === u.id,
                  ).length;
                  const taskCount = allTasks.filter(
                    (t) => t.user.id === u.id,
                  ).length;
                  const achCount = allAchievements.filter(
                    (a) => a.user.id === u.id,
                  ).length;
                  const expCount = allExperiences.filter(
                    (e) => e.user.id === u.id,
                  ).length;

                  return (
                    <tr key={u.id} className={DIRECTORY_THEME.table.row}>
                      {/* USUARIO */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 rounded-lg border border-white/5 shadow-inner">
                            <AvatarImage
                              src={u.profile_image_url || undefined}
                              alt={u.names}
                            />
                            <AvatarFallback className="bg-indigo-700 text-xs font-bold text-white">
                              {getInitials(u)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className={DIRECTORY_THEME.table.textPrimary}>
                              {`${u.names} ${u.first_last_name}`}
                            </span>
                            <span
                              className={DIRECTORY_THEME.table.textSecondary}
                            >
                              ID Estudiante: {u.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* EMAIL */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Mail className="w-3.5 h-3.5 text-cyan-500/50" />
                          {u.email}
                        </div>
                      </td>

                      {/* ACTIVIDAD (REEMPLAZO DE ROL Y ACCIONES) */}
                      <td className="px-6 py-4">
                        <div className="flex justify-center items-center gap-4">
                          <StatBadge
                            icon={FileText}
                            count={noteCount}
                            color="text-purple-400"
                            label="Notas"
                          />
                          <StatBadge
                            icon={CheckSquare}
                            count={taskCount}
                            color="text-blue-400"
                            label="Tareas"
                          />
                          <StatBadge
                            icon={Trophy}
                            count={achCount}
                            color="text-amber-400"
                            label="Logros"
                          />
                          <StatBadge
                            icon={Briefcase}
                            count={expCount}
                            color="text-green-400"
                            label="Exp"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINACIÓN */}
        <div className={DIRECTORY_THEME.pagination.wrapper}>
          <Pagination>
            <PaginationContent className="w-full flex justify-between sm:justify-center gap-2">
              <PaginationItem>
                <PaginationPrevious
                  className={`cursor-pointer ${currentPage === 1 ? "pointer-events-none opacity-50" : "hover:text-cyan-400"}`}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                />
              </PaginationItem>

              <div className="hidden sm:flex items-center gap-1">
                {Array.from(
                  { length: pagination?.totalPages || 0 },
                  (_, i) => i + 1,
                ).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={currentPage === page}
                      onClick={() => setCurrentPage(page)}
                      className={`cursor-pointer ${currentPage === page ? DIRECTORY_THEME.pagination.active : DIRECTORY_THEME.pagination.inactive}`}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </div>

              <PaginationItem>
                <PaginationNext
                  className={`cursor-pointer ${currentPage === pagination?.totalPages ? "pointer-events-none opacity-50" : "hover:text-cyan-400"}`}
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, pagination?.totalPages || 1),
                    )
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </SectionLayout>
  );
}

// Componente pequeño para mostrar las estadísticas en la tabla
function StatBadge({ icon: Icon, count, color, label }: any) {
  return (
    <div className="flex flex-col items-center group" title={label}>
      <div
        className={`flex items-center gap-1.5 ${count > 0 ? color : "text-gray-600"}`}
      >
        <Icon className="w-4 h-4" />
        <span className="text-sm font-bold">{count}</span>
      </div>
      <span className="text-[9px] uppercase tracking-widest text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
        {label}
      </span>
    </div>
  );
}
