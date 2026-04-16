import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router";
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
import { Input } from "@/components/ui/input";
import {
  Mail,
  Users,
  FileText,
  CheckSquare,
  Trophy,
  Briefcase,
  Search,
  X,
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
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { user, usersList, pagination, setUsersData, searchUsers } =
    useUserStore();
  const { adminData: allNotes, fetchNotes } = useNoteStore();
  const { adminData: allTasks, fetchTasks } = useTaskStore();
  const { adminData: allAchievements, fetchAchievements } =
    useAchievementStore();
  const { adminData: allExperiences, fetchExperiences } = useExperienceStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!isAuthenticated) return;

    const loadData = async () => {
      setIsLoading(true);
      try {
        if (searchQuery.trim().length > 0) {
          await searchUsers(searchQuery);
        } else {
          const resUsers = await userService.getAll({
            page: currentPage,
            limit: 10,
          });
          setUsersData(resUsers.data, resUsers.pagination);
        }
        await Promise.all([
          fetchNotes(),
          fetchTasks(),
          fetchAchievements(),
          fetchExperiences(),
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(loadData, searchQuery ? 500 : 0);
    return () => clearTimeout(timer);
  }, [
    isAuthenticated,
    currentPage,
    searchQuery,
    searchUsers,
    setUsersData,
    fetchNotes,
    fetchTasks,
    fetchAchievements,
    fetchExperiences,
  ]);

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
        {/* BUSCADOR */}
        <div className="mb-10 relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-500 transition-colors">
            <Search className="w-4 h-4" />
          </div>
          <Input
            placeholder="Buscar por correo electrónico (ej: ricardo@...)"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-600 focus-visible:ring-cyan-500/50 focus-visible:border-cyan-500/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* CONTENEDOR DE TABLA CON ALTURA DINÁMICA */}
        <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/20">
          <table className="w-full text-left border-collapse table-auto">
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
                    className="py-10 text-center text-gray-500 animate-pulse"
                  >
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-20" />
                    Cargando información...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="py-12 text-center text-gray-500 italic"
                  >
                    No hay usuarios registrados.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
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
                    <tr
                      key={u.id}
                      className={DIRECTORY_THEME.table.row}
                      onClick={() =>
                        navigate(`/admin/directory/${u.id}`, {
                          state: { email: u.email },
                        })
                      }
                    >
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

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Mail className="w-3.5 h-3.5 text-cyan-500/50" />
                          {u.email}
                        </div>
                      </td>

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

        {/* PAGINACIÓN CONDICIONAL: Solo si hay registros y más de 1 página */}
        {!isLoading &&
          filteredUsers.length > 0 &&
          (pagination?.totalPages ?? 0) > 1 && (
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
          )}
      </div>
    </SectionLayout>
  );
}

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
