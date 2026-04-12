import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/modules/core/context/AuthContext";
import paths from "@/modules/core/routes/paths/path";

export const PublicRoute = () => {
  const { isAuthenticated, user } = useAuth();

  // Si YA está autenticado, lo redirigimos a donde le toca
  if (isAuthenticated && user) {
    if (user.role === "ADMIN") {
      return <Navigate to={paths.adminHome} replace />;
    }
    return <Navigate to={paths.home} replace />;
  }

  // Si no está autenticado, puede ver las páginas de Login/Register
  return <Outlet />;
};
