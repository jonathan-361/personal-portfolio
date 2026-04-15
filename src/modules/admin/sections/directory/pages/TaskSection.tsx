import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { SectionLayout } from "@/components/custom/SectionLayout";
import { Loader2, ArrowLeft, ListTodo, Search, X } from "lucide-react";
import { TaskCard } from "@/components/custom/TaskCard";
import { useTaskStore } from "@/modules/core/store/task.store";
import { useUserStore } from "@/modules/core/store/user.store";
import { Input } from "@/components/ui/input";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function TaskSection() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Traemos un límite alto (p.ej. 200) para manejar el Kanban en el cliente
  const { tasks, isLoading, fetchTasks } = useTaskStore();
  const { usersList, user: admin } = useUserStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPagePerSection = 3; // Regla de negocio

  const targetUser = useMemo(() => {
    return usersList.find((u) => u.id === Number(id));
  }, [usersList, id]);

  useEffect(() => {
    if (targetUser?.email) {
      // Nota: Aumentamos el límite para obtener todas las tareas y poder distribuirlas
      fetchTasks(targetUser.email, 1, 100);
    }
  }, [targetUser?.email, fetchTasks]);

  // 1. Filtrado inicial por búsqueda
  const searchedTasks = useMemo(() => {
    if (!searchTerm.trim()) return tasks;
    const lowerTerm = searchTerm.toLowerCase();
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(lowerTerm) ||
        t.description?.toLowerCase().includes(lowerTerm),
    );
  }, [tasks, searchTerm]);

  // 2. Agrupación por columnas
  const tasksByStatus = useMemo(() => {
    return {
      PENDIENTE: searchedTasks.filter((t) => t.in_progress === "PENDIENTE"),
      "EN PROCESO": searchedTasks.filter((t) => t.in_progress === "EN PROCESO"),
      COMPLETADO: searchedTasks.filter((t) => t.in_progress === "COMPLETADO"),
    };
  }, [searchedTasks]);

  // 3. Cálculo de páginas basado en la columna más larga
  const totalPages = useMemo(() => {
    const counts = [
      tasksByStatus.PENDIENTE.length,
      tasksByStatus["EN PROCESO"].length,
      tasksByStatus.COMPLETADO.length,
    ];
    const max = Math.max(...counts);
    return Math.ceil(max / itemsPerPagePerSection) || 1;
  }, [tasksByStatus]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const columns: {
    title: string;
    status: "PENDIENTE" | "EN PROCESO" | "COMPLETADO";
  }[] = [
    { title: "Pendientes", status: "PENDIENTE" },
    { title: "En Proceso", status: "EN PROCESO" },
    { title: "Completado", status: "COMPLETADO" },
  ];

  if (!admin) return null;

  return (
    <SectionLayout
      user={admin}
      title={targetUser ? `Tareas de ${targetUser.names}` : "Cargando..."}
      subtitle="Seguimiento de actividades y flujo de trabajo"
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
            placeholder="Buscar tarea..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-9 bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-600 focus-visible:ring-blue-600/50"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500 gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="font-medium animate-pulse text-xs tracking-widest uppercase">
            Sincronizando...
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {columns.map((column) => {
              // Lógica clave: paginar cada columna de forma independiente pero con el mismo índice
              const columnTasks = tasksByStatus[column.status];
              const start = (currentPage - 1) * itemsPerPagePerSection;
              const paginatedTasks = columnTasks.slice(
                start,
                start + itemsPerPagePerSection,
              );

              return (
                <div
                  key={column.status}
                  className="flex flex-col gap-4 bg-gray-900/10 p-4 rounded-2xl border border-gray-900/50 min-h-[400px]"
                >
                  <div className="flex justify-between items-center px-2">
                    <span className="text-[10px] font-black uppercase text-gray-500">
                      {column.title}
                    </span>
                    <span className="text-[10px] bg-gray-800 text-gray-400 px-2 rounded-full font-bold">
                      {columnTasks.length}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {paginatedTasks.length > 0 ? (
                      paginatedTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          showActions={false}
                        />
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-800 rounded-xl opacity-30">
                        <ListTodo className="w-5 h-5 mb-2 text-gray-700" />
                        <p className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">
                          Sin registros
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="pb-20">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
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
                        className="cursor-pointer border-gray-800"
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
                          : "cursor-pointer"
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
    </SectionLayout>
  );
}
