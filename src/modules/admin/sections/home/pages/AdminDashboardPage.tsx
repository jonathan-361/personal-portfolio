import { SectionLayout } from "@/components/custom/SectionLayout";
import { useAuth } from "@/modules/core/context/AuthContext";
// IMPORTANTE: Usamos 'import type' y renombramos para evitar confusión
import type { User as DashboardUser } from "@/modules/core/data/dashboard.types";

export function AdminDashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  // Hacemos una conversión segura pasando por 'unknown' como sugirió el error
  const adminUser = user as unknown as DashboardUser;

  return (
    <SectionLayout
      user={adminUser}
      title="Dashboard Administrativo"
      subtitle="Resumen general del sistema y estadísticas globales"
      showButton={false}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
          <h3 className="text-gray-400 text-sm font-medium">
            Usuarios Totales
          </h3>
          <p className="text-3xl font-bold mt-2 text-blue-500">124</p>
        </div>
        <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
          <h3 className="text-gray-400 text-sm font-medium">Notas Creadas</h3>
          <p className="text-3xl font-bold mt-2 text-purple-500">452</p>
        </div>
        <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
          <h3 className="text-gray-400 text-sm font-medium">
            Actividad Semanal
          </h3>
          <p className="text-3xl font-bold mt-2 text-green-500">+18%</p>
        </div>
      </div>
    </SectionLayout>
  );
}
