import { useState } from "react";
import { SectionLayout } from "@/components/custom/SectionLayout";
import { TaskCard } from "../components/TaskCard";
import { TaskFormAside } from "../components/TaskFormAside";
import { useTaskStore } from "@/modules/core/store/task.store";
import { userMock } from "@/modules/core/data/dashboard.data";
import { type TaskStatus } from "@/modules/core/data/dashboard.types";

export default function TasksPage() {
  const tasks = useTaskStore((state) => state.tasks);
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  const columns: { title: string; status: TaskStatus }[] = [
    { title: "Pendientes", status: "PENDIENTE" },
    { title: "En Proceso", status: "PROCESO" },
    { title: "Completado", status: "COMPLETADO" },
  ];

  return (
    <SectionLayout
      user={userMock}
      title="Actividades"
      subtitle="Gestión de tareas y pendientes"
      buttonLabel="Nueva Actividad"
      onButtonClick={() => setIsAsideOpen(true)}
      showButton={!isAsideOpen}
    >
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
              <span className="text-[10px] bg-gray-800 text-gray-400 px-2 rounded-full">
                {tasks.filter((t) => t.status === column.status).length}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {tasks
                .filter((t) => t.status === column.status)
                .map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}

              {tasks.filter((t) => t.status === column.status).length === 0 && (
                <div className="text-center py-10 border border-dashed border-gray-800 rounded-xl">
                  <p className="text-xs text-gray-600 italic">No hay tareas</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Formulario lateral hecho con un aside */}
      {isAsideOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <TaskFormAside onClose={() => setIsAsideOpen(false)} />
        </div>
      )}
    </SectionLayout>
  );
}
