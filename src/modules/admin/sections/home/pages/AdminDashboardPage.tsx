import { useEffect, useMemo } from "react";
import { SectionLayout } from "@/components/custom/SectionLayout";
import { useAuth } from "@/modules/core/context/AuthContext";
import { useUserStore } from "@/modules/core/store/user.store";
import { useTaskStore } from "@/modules/core/store/task.store";
import { useAchievementStore } from "@/modules/core/store/achievement.store";
import { useExperienceStore } from "@/modules/core/store/experience.store";
import { userService } from "@/modules/core/services/user-services/user.services";

export function AdminDashboardPage() {
  const { isAuthenticated } = useAuth();

  // Stores
  const { user, pagination, setUsersData } = useUserStore();
  const { tasks, fetchTasks } = useTaskStore();
  const { achievements, fetchAchievements } = useAchievementStore();
  const { experiences, fetchExperiences } = useExperienceStore();

  useEffect(() => {
    if (isAuthenticated) {
      // Cargamos todos los datos necesarios para las métricas
      userService
        .getAll({ page: 1, limit: 1 })
        .then((res) => setUsersData(res.data, res.pagination));
      fetchTasks();
      fetchAchievements();
      fetchExperiences();
    }
  }, [isAuthenticated]);

  // --- CÁLCULO DE MÉTRICAS (Memoizadas para rendimiento) ---

  const metrics = useMemo(() => {
    // 1. Tasa de Empleo (Experiencias con end_date NULL)
    const totalUsersWithExp = new Set(experiences.map((e) => e.user_id)).size;
    const currentlyWorking = new Set(
      experiences.filter((e) => !e.end_date).map((e) => e.user_id),
    ).size;
    const employmentRate =
      totalUsersWithExp > 0 ? (currentlyWorking / totalUsersWithExp) * 100 : 0;

    // 2. Eficiencia de Tareas (Burnout)
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(
      (t) => t.in_progress === "COMPLETADO",
    ).length;
    const taskEfficiency =
      totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // 3. Categoría de Logros Dominante
    const counts: Record<string, number> = {};
    achievements.forEach((ach) => {
      counts[ach.achievement_type] = (counts[ach.achievement_type] || 0) + 1;
    });
    const dominantCategory =
      Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "Ninguna";

    return {
      employmentRate: employmentRate.toFixed(1),
      taskEfficiency: taskEfficiency.toFixed(1),
      dominantCategory,
      totalTasks,
    };
  }, [tasks, achievements, experiences]);

  if (!isAuthenticated || !user) return null;

  return (
    <SectionLayout
      user={user}
      title="Dashboard Administrativo"
      subtitle="Métricas de rendimiento y salud del ecosistema"
      showButton={false}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Usuarios Totales */}
        <MetricCard
          title="Usuarios Totales"
          value={pagination?.Total ?? 0}
          color="text-blue-500"
        />

        {/* Tasa de Empleo */}
        <MetricCard
          title="Tasa de Empleo"
          value={`${metrics.employmentRate}%`}
          color="text-green-500"
          subtitle="Usuarios con empleo actual"
        />

        {/* Eficiencia de Tareas */}
        <MetricCard
          title="Eficiencia (Tasks)"
          value={`${metrics.taskEfficiency}%`}
          color="text-orange-500"
          subtitle={`${metrics.totalTasks} tareas totales`}
        />

        {/* Logros Dominantes */}
        <MetricCard
          title="Categoría Dominante"
          value={metrics.dominantCategory}
          color="text-purple-500"
          subtitle="Tipo de logro más frecuente"
        />
      </div>

      {/* Sección de Health Score (Ranking) */}
      <div className="mt-10 bg-gray-900/30 border border-gray-800 rounded-3xl p-8">
        <h3 className="text-xl font-bold mb-6">
          User Health Score (Actividad Reciente)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 border-b border-gray-800">
                <th className="pb-4 font-medium">Usuario (ID)</th>
                <th className="pb-4 font-medium text-center">Tareas</th>
                <th className="pb-4 font-medium text-center">Logros</th>
                <th className="pb-4 font-medium text-right">Estado de Salud</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {/* Aquí mapearíamos los usuarios. Ejemplo estático de cómo se vería: */}
              <HealthRow id={4} tasks={1} achievements={1} />
              <HealthRow id={1} tasks={0} achievements={0} />
            </tbody>
          </table>
        </div>
      </div>
    </SectionLayout>
  );
}

// Sub-componentes para mantener el código limpio
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

function HealthRow({ id, tasks, achievements }: any) {
  const score = tasks + achievements;
  const status =
    score > 1 ? "🔥 Activo" : score > 0 ? "⚡ Estable" : "😴 Inactivo";
  const statusColor =
    score > 1
      ? "text-green-400"
      : score > 0
        ? "text-yellow-400"
        : "text-gray-500";

  return (
    <tr>
      <td className="py-4">Usuario #{id}</td>
      <td className="py-4 text-center">{tasks}</td>
      <td className="py-4 text-center">{achievements}</td>
      <td className={`py-4 text-right font-medium ${statusColor}`}>{status}</td>
    </tr>
  );
}
