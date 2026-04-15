import { useEffect, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { SectionLayout } from "@/components/custom/SectionLayout";
import { useUserStore } from "@/modules/core/store/user.store";
import { useAuth } from "@/modules/core/context/AuthContext";
import { InfoUserCard } from "@/modules/admin/sections/directory/components/InfoUserCard";

export default function AdminViewUserPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { user: admin, usersList, searchUsers } = useUserStore();
  const { isAuthenticated } = useAuth();

  const userEmail = location.state?.email;

  useEffect(() => {
    if (userEmail) {
      searchUsers(userEmail);
    }
  }, [userEmail, searchUsers]);

  const targetUser = useMemo(() => {
    return usersList.find((u) => u.id === Number(id));
  }, [usersList, id]);

  if (!isAuthenticated || !admin) return null;

  return (
    <SectionLayout
      user={admin}
      isLoadingHeader={!targetUser}
      showButton={false}
      isHeaderSticky={false}
      title={targetUser ? "Detalles del Usuario" : "Cargando..."}
    >
      {targetUser ? (
        <InfoUserCard targetUser={targetUser} onBack={() => navigate(-1)} />
      ) : (
        <div className="py-20 text-center text-gray-500 animate-pulse bg-gray-900/20 rounded-2xl border border-dashed border-gray-800">
          Sincronizando expediente del estudiante...
        </div>
      )}
    </SectionLayout>
  );
}
