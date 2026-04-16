import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/modules/core/context/AuthContext";
import paths from "@/modules/core/routes/paths/path";

export const PublicRoute = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user) {
    if (user.role === "ADMIN") {
      return <Navigate to={paths.adminHome} replace />;
    }
    return <Navigate to={paths.home} replace />;
  }

  return <Outlet />;
};
