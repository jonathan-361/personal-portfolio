import { SectionLayout } from "@/components/custom/SectionLayout";
import { useAuth } from "@/modules/core/context/AuthContext";
import { useUserStore } from "@/modules/core/store/user.store";

import { getFirstNameLastName } from "@/lib/getFirstNameLastName";

export function AdminDirectoryPage() {
  const { isAuthenticated } = useAuth();
  const { user } = useUserStore();

  if (!isAuthenticated || !user) return null;

  const handleCreateUser = () => {
    console.log("Abriendo modal para nuevo usuario...");
  };

  return (
    <SectionLayout
      user={user}
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
          <p className="text-gray-600 text-sm italic">
            Sesión administrativa activa: {getFirstNameLastName(user as any)}
          </p>
        </div>
      </div>
    </SectionLayout>
  );
}
