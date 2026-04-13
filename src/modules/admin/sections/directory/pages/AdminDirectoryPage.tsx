import { useEffect, useState, useMemo } from "react";
import { SectionLayout } from "@/components/custom/SectionLayout";
import { useAuth } from "@/modules/core/context/AuthContext";
import { useUserStore } from "@/modules/core/store/user.store";
import { userService } from "@/modules/core/services/user-services/user.services";
import { getInitials } from "@/lib/getInitials";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, MoreHorizontal, Users } from "lucide-react";
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
  const { user, usersList, pagination, setUsersData } = useUserStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      userService
        .getAll({ page: currentPage, limit: 10 })
        .then((res) => {
          setUsersData(res.data, res.pagination);
        })
        .finally(() => setIsLoading(false));
    }
  }, [isAuthenticated, currentPage, setUsersData]);

  const filteredUsers = useMemo(() => {
    return usersList.filter((u) => u.role !== "ADMIN");
  }, [usersList]);

  if (!isAuthenticated || !user) return null;

  return (
    <SectionLayout
      user={user}
      title="Directorio de Usuarios"
      subtitle="Gestiona exclusivamente a los estudiantes y usuarios del sistema"
      buttonLabel="Nuevo Usuario"
      onButtonClick={() => console.log("Nuevo usuario...")}
    >
      <div className={DIRECTORY_THEME.container}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={DIRECTORY_THEME.table.header}>
                <th className="px-6 py-4 font-semibold">Usuario</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold text-center">Rol</th>
                <th className="px-6 py-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="py-20 text-center text-gray-500 animate-pulse"
                  >
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-20" />
                    Cargando directorio...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="py-20 text-center text-gray-500 italic"
                  >
                    No hay usuarios registrados en esta sección.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className={DIRECTORY_THEME.table.row}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 rounded-lg border border-white/5 shadow-inner">
                          <AvatarImage
                            src={u.profile_image_url || undefined}
                            alt={u.names}
                          />
                          <AvatarFallback className="bg-cyan-700 text-xs font-bold text-white">
                            {getInitials(u)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className={DIRECTORY_THEME.table.textPrimary}>
                            {`${u.names} ${u.first_last_name}`}
                          </span>
                          <span className={DIRECTORY_THEME.table.textSecondary}>
                            ID: #{u.id}
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
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase border ${DIRECTORY_THEME.roles.USER.bg} ${DIRECTORY_THEME.roles.USER.text} ${DIRECTORY_THEME.roles.USER.border}`}
                      >
                        {DIRECTORY_THEME.roles.USER.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-500 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* --- PAGINACIÓN --- */}
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
