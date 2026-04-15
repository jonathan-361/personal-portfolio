import { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { SectionLayout } from "@/components/custom/SectionLayout";
import { Loader2, ArrowLeft, ListTodo } from "lucide-react";
import { TaskCard } from "@/components/custom/TaskCard";
import { useTaskStore } from "@/modules/core/store/task.store";
import { useUserStore } from "@/modules/core/store/user.store";

export default function TaskSection() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { tasks, isLoading, fetchTasks } = useTaskStore();
  const { usersList, user: admin } = useUserStore();

  const targetUser = useMemo(() => {
    return usersList.find((u) => u.id === Number(id));
  }, [usersList, id]);

  useEffect(() => {
    if (targetUser?.email) {
      fetchTasks(targetUser.email);
    }
  }, [targetUser?.email, fetchTasks]);

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
      {/* Botón Volver */}
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
          <p className="font-medium animate-pulse tracking-widest uppercase text-xs text-center">
            Sincronizando tablero de tareas...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start pb-20">
          {columns.map((column) => (
            <div
              key={column.status}
              className="flex flex-col gap-4 bg-gray-900/10 p-4 rounded-2xl border border-gray-900/50 min-h-[400px]"
            >
              <div className="flex justify-between items-center px-2">
                <span className="text-[10px] font-black uppercase text-gray-500 tracking-tighter">
                  {column.title}
                </span>
                <span className="text-[10px] bg-gray-800 text-gray-400 px-2 rounded-full font-bold">
                  {tasks.filter((t) => t.in_progress === column.status).length}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {tasks
                  .filter((t) => t.in_progress === column.status)
                  .map((task) => (
                    <TaskCard key={task.id} task={task} showActions={false} />
                  ))}

                {tasks.filter((t) => t.in_progress === column.status).length ===
                  0 && (
                  <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-800 rounded-xl opacity-40">
                    <ListTodo className="w-5 h-5 mb-2 text-gray-700" />
                    <p className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">
                      Sin registros
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionLayout>
  );
}
