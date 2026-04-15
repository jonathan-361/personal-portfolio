import { useEffect, useMemo } from "react";
import { SectionLayout } from "@/components/custom/SectionLayout";
import { useAuth } from "@/modules/core/context/AuthContext";
import { useUserStore } from "@/modules/core/store/user.store";
import { useNoteStore } from "@/modules/core/store/note.store";
import { useTaskStore } from "@/modules/core/store/task.store";
import { useAchievementStore } from "@/modules/core/store/achievement.store";
import { useExperienceStore } from "@/modules/core/store/experience.store";
import { userService } from "@/modules/core/services/user-services/user.services";

// Gráficos y Fechas
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export function AdminDashboardPage() {
  const { isAuthenticated } = useAuth();

  // Stores
  const { user, pagination: userPagination, setUsersData } = useUserStore();
  const {
    pagination: notePagination,
    fetchNotes,
    adminData: notesData,
  } = useNoteStore();
  const { pagination: taskPagination, fetchTasks } = useTaskStore();
  const {
    pagination: achievementPagination,
    fetchAchievements,
    adminData: achievementsData,
  } = useAchievementStore();
  const { pagination: experiencePagination, fetchExperiences } =
    useExperienceStore();

  useEffect(() => {
    if (isAuthenticated) {
      // Mantenemos tu carga original de usuarios
      userService
        .getAll({ page: 1, limit: 100 }) // Aumentamos el limit para tener datos para el dashboard
        .then((res) => setUsersData(res.data, res.pagination));

      fetchNotes();
      fetchTasks();
      fetchAchievements();
      fetchExperiences();
    }
  }, [
    isAuthenticated,
    setUsersData,
    fetchNotes,
    fetchTasks,
    fetchAchievements,
    fetchExperiences,
  ]);

  // --- LÓGICA DE LA GRÁFICA ---
  const achievementChartData = useMemo(() => {
    const counts = { ACADEMICO: 0, PERSONAL: 0, PROFESIONAL: 0 };
    achievementsData.forEach((item) => {
      const type = item.achievement.achievement_type;
      if (type in counts) {
        counts[type as keyof typeof counts]++;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [achievementsData]);

  const hasAchievementData = useMemo(
    () => achievementChartData.some((item) => item.value > 0),
    [achievementChartData],
  );

  const COLORS = ["#8b5cf6", "#10b981", "#f59e0b"];

  // --- LÓGICA DEL TIMELINE (Actividad Reciente) ---
  const timelineActivities = useMemo(() => {
    const activities = [
      ...notesData.map((n) => ({
        user: `${n.user.names} ${n.user.first_last_name}`,
        action: `agregó una nota: "${n.content.title}"`,
        date: new Date(n.content.created_at || ""),
        type: "note",
      })),
      ...achievementsData.map((a) => ({
        user: `${a.user.names} ${a.user.first_last_name}`,
        action: `completó el logro: "${a.achievement.title}"`,
        date: new Date(a.achievement.created_at || ""),
        type: "achievement",
      })),
    ];

    return activities
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5);
  }, [notesData, achievementsData]);

  if (!isAuthenticated || !user) return null;

  return (
    <SectionLayout
      user={user}
      title="Dashboard Administrativo"
      subtitle="Resumen general de la plataforma"
      showButton={false}
    >
      {/* 1. Fila de Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        <MetricCard
          title="Usuarios"
          value={userPagination?.Total ?? 0}
          color="text-blue-500"
          subtitle="Registrados"
        />
        <MetricCard
          title="Notas"
          value={notePagination?.total ?? 0}
          color="text-purple-500"
          subtitle="Creadas"
        />
        <MetricCard
          title="Tareas"
          value={taskPagination?.Total ?? 0}
          color="text-amber-500"
          subtitle="Totales"
        />
        <MetricCard
          title="Logros"
          value={achievementPagination?.Total ?? 0}
          color="text-green-500"
          subtitle="Alcanzados"
        />
        <MetricCard
          title="Experiencias"
          value={experiencePagination?.Total ?? 0}
          color="text-cyan-500"
          subtitle="Registradas"
        />
      </div>

      {/* 2. Sección de Gráfica y Actividad */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Card de Gráfica Responsiva */}
        <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 flex flex-col min-h-[420px]">
          <h3 className="text-white font-semibold mb-4 shrink-0">
            Distribución de Logros
          </h3>
          <div className="flex-1 w-full relative min-h-0">
            {hasAchievementData ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={achievementChartData}
                    innerRadius="60%"
                    outerRadius="80%"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {achievementChartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-3 text-xl">
                  📊
                </div>
                <p className="text-gray-400 text-sm font-medium">
                  Sin datos de logros
                </p>
                <p className="text-gray-600 text-xs mt-1">
                  Se mostrarán cuando haya registros.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Card de Actividad Reciente */}
        <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 flex flex-col min-h-[420px]">
          <h3 className="text-white font-semibold mb-6 shrink-0">
            Actividad Reciente
          </h3>
          <div className="flex flex-col gap-6 overflow-y-auto pr-2">
            {timelineActivities.length > 0 ? (
              timelineActivities.map((act, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i !== timelineActivities.length - 1 && (
                    <div className="absolute left-[11px] top-7 w-[2px] h-full bg-gray-800" />
                  )}
                  <div
                    className={`w-6 h-6 rounded-full border-4 border-gray-900 shrink-0 ${
                      act.type === "note" ? "bg-purple-500" : "bg-green-500"
                    }`}
                  />
                  <div>
                    <p className="text-sm text-gray-300">
                      <span className="font-bold text-white">{act.user}</span>{" "}
                      {act.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(act.date, {
                        addSuffix: true,
                        locale: es,
                      })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center mt-10 italic">
                No hay actividad reciente.
              </p>
            )}
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}

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
