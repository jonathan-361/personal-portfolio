import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { User } from "@/modules/home/models/user.model";
import { useUserStore } from "@/modules/core/store/user.store";
import { userService } from "@/modules/core/services/user-services/user.services";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, user: User) => void;
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

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        try {
          const freshUser = await userService.getMe();
          setUserState(freshUser);
          setZustandUser(freshUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Token inválido o expirado");
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [setZustandUser]);

  const login = async (token: string) => {
    localStorage.setItem("auth_token", token);

    try {
      const freshUser = await userService.getMe();

      localStorage.setItem("auth_user", JSON.stringify(freshUser));
      setUserState(freshUser);
      setZustandUser(freshUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error al obtener datos tras login:", error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    localStorage.removeItem("user-storage");
    setUserState(null);
    clearZustandUser();
    setIsAuthenticated(false);
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
