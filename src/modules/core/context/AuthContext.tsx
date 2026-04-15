import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router";
import type { User } from "@/modules/home/models/user.model";
import { useUserStore } from "@/modules/core/store/user.store";
import { userService } from "@/modules/core/services/user-services/user.services";
import paths from "@/modules/core/routes/paths/path";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setUser: setZustandUser, clearUser: clearZustandUser } =
    useUserStore();
  const [user, setUserState] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    localStorage.removeItem("user-storage");
    localStorage.removeItem("sidebar-storage");
    setUserState(null);
    clearZustandUser();
    setIsAuthenticated(false);
    navigate(paths.login, { replace: true });
  }, [clearZustandUser, navigate]);

  // Escucha cuando el interceptor de Axios detecta un 401
  useEffect(() => {
    const handleForcedLogout = () => logout();
    window.addEventListener("auth:logout", handleForcedLogout);
    return () => window.removeEventListener("auth:logout", handleForcedLogout);
  }, [logout]);

  // Al montar, valida el token con el servidor
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        try {
          const freshUser = await userService.getMe();
          setUserState(freshUser);
          setZustandUser(freshUser);
          setIsAuthenticated(true);
        } catch {
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Solo al montar

  const login = async (token: string) => {
    localStorage.setItem("auth_token", token);
    try {
      const freshUser = await userService.getMe();
      setUserState(freshUser);
      setZustandUser(freshUser);
      setIsAuthenticated(true);
    } catch {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
