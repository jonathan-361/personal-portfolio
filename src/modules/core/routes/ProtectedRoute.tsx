import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import paths from "./paths/path";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={paths.login} replace />;
  }

  return <Outlet />;
};
