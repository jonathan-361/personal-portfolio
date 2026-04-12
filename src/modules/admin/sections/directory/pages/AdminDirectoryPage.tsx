import { SectionLayout } from "@/components/custom/SectionLayout";
import { useAuth } from "@/modules/core/context/AuthContext";
// Aplicamos la misma lógica de importación de tipo
import type { User as DashboardUser } from "@/modules/core/data/dashboard.types";

export function AdminDirectoryPage() {
  const { user } = useAuth();

  if (!user) return null;

  // Conversión doble para satisfacer a TypeScript
  const adminUser = user as unknown as DashboardUser;

  const handleCreateUser = () => {
    console.log("Abriendo modal para nuevo usuario...");
  };

  return (
    <SectionLayout
      user={adminUser}
      title="Directorio de Usuarios"
      subtitle="Administra, edita y gestiona los permisos de los usuarios registrados"
      buttonLabel="Nuevo Usuario"
      onButtonClick={handleCreateUser}
    >
      <div className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-800 bg-gray-900/30">
          <h3 className="text-sm font-semibold">
            Lista de Usuarios registrados
          </h3>
        </div>

        {/* Usamos min-h-[400px] (Tailwind JIT) o min-h-96 si prefieres estándar */}
        <div className="min-h-[400px] flex flex-col items-center justify-center p-4">
          <div className="bg-gray-800/50 p-4 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <p className="text-gray-400 font-medium">
            Tabla de usuarios en desarrollo
          </p>
          <p className="text-gray-600 text-sm">
            Gestionando acceso para: {adminUser.first_name}
          </p>
        </div>
      </div>
    </SectionLayout>
  );
}
