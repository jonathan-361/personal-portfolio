import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/modules/core/context/AuthContext";
import paths from "@/modules/core/routes/paths/path";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  // Verificación adicional de seguridad con el token físico
  const hasToken = !!localStorage.getItem("auth_token");

  // Si no está autenticado en el estado global o no existe el token, redirigir
  if (!isAuthenticated || !hasToken) {
    return <Navigate to={paths.login} replace />;
  }

  // Validación de permisos por rol
  if (allowedRoles && user && !allowedRoles.includes(user.role || "")) {
    return <Navigate to={paths.test2} replace />;
  }

  return <Outlet />;
};
