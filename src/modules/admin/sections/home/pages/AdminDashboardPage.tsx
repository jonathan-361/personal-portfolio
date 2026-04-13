import { useEffect } from "react";
import { SectionLayout } from "@/components/custom/SectionLayout";
import { useAuth } from "@/modules/core/context/AuthContext";
import { useUserStore } from "@/modules/core/store/user.store";
import { useNoteStore } from "@/modules/core/store/note.store";
import { useTaskStore } from "@/modules/core/store/task.store";
import { useAchievementStore } from "@/modules/core/store/achievement.store";
import { userService } from "@/modules/core/services/user-services/user.services";
import { useExperienceStore } from "@/modules/core/store/experience.store";

export function AdminDashboardPage() {
  const { isAuthenticated } = useAuth();

  // Stores
  const { user, pagination: userPagination, setUsersData } = useUserStore();
  const { pagination: notePagination, fetchNotes } = useNoteStore();
  const { pagination: taskPagination, fetchTasks } = useTaskStore();
  const { pagination: achievementPagination, fetchAchievements } =
    useAchievementStore();
  const { pagination: experiencePagination, fetchExperiences } =
    useExperienceStore();

  useEffect(() => {
    if (isAuthenticated) {
      // Cargar Usuarios
      userService
        .getAll({ page: 1, limit: 1 })
        .then((res) => setUsersData(res.data, res.pagination));

      fetchNotes();
      fetchTasks();
      fetchAchievements();
      fetchExperiences();
    }
  }, [isAuthenticated, setUsersData, fetchNotes, fetchTasks]); // 4. Agregar fetchTasks a las dependencias

  if (!isAuthenticated || !user) return null;

  return (
    <SectionLayout
      user={user}
      title="Dashboard Administrativo"
      subtitle="Resumen general de la plataforma"
      showButton={false}
    >
      {/* 5. Ajustar grid a 3 columnas (ya lo tienes así) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Usuarios Totales */}
        <MetricCard
          title="Usuarios Totales"
          value={userPagination?.Total ?? 0}
          color="text-blue-500"
          subtitle="Registrados en la base de datos"
        />

        {/* Notas Totales */}
        <MetricCard
          title="Notas Totales"
          value={notePagination?.total ?? 0}
          color="text-purple-500"
          subtitle="Creadas por todos los usuarios"
        />

        {/* Tareas totales */}
        <MetricCard
          title="Tareas Totales"
          value={taskPagination?.Total ?? 0}
          color="text-amber-500"
          subtitle="Pendientes y completadas"
        />

        {/* Logros totales */}
        <MetricCard
          title="Logros Totales"
          value={achievementPagination?.Total ?? 0}
          color="text-green-500"
          subtitle="Hitos alcanzados por la comunidad"
        />

        {/* Experiencias totales */}
        <MetricCard
          title="Experiencias Totales"
          value={experiencePagination?.Total ?? 0}
          color="text-cyan-500"
          subtitle="Trayectorias laborales registradas"
        />
      </div>
    </SectionLayout>
  );
}

// Sub-componente MetricCard (se mantiene igual)
function MetricCard({ title, value, color, subtitle }: any) {
  return (
    <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 flex flex-col justify-between">
      <div>
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
      </div>
      {subtitle && <p className="text-xs text-gray-500 mt-4">{subtitle}</p>}
    </div>
  );
}
