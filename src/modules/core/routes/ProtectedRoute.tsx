import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/modules/core/context/AuthContext";
import paths from "@/modules/core/routes/paths/path";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={paths.login} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role || "")) {
    return <Navigate to={paths.test2} replace />;
  }

  return <Outlet />;
};
