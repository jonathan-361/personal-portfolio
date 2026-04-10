import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { authService } from "@/modules/core/services/auth-services/auth.services";
import paths from "@/modules/core/routes/paths/path";
import { toast } from "sonner";

import { useSidebarStore } from "@/modules/core/store/sidebar.store";

import type { User } from "@/modules/core/data/dashboard.types";
import { Button } from "@/components/ui/button";
import Loading from "./Loading";

// 🧩 Dropdown (ShadCN)
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// Iconos
import {
  Home,
  StickyNote,
  Trophy,
  CheckSquare,
  Briefcase,
  Menu,
} from "lucide-react";

function getInitials(user: User) {
  return `${user.first_name[0]}${user.last_name[0]}`;
}

export function Sidebar({ user }: { user: User }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { isOpen, toggle } = useSidebarStore();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authService.logout();
      toast.success("Sesión cerrada");
      navigate(paths.login);
    } catch (error) {
      toast.error("Error al cerrar sesión");
      setIsLoggingOut(false);
    }
  };

  const navItems = [
    { label: "Inicio", path: paths.home, icon: Home },
    { label: "Notas", path: paths.notes, icon: StickyNote },
    { label: "Logros", path: paths.achievement, icon: Trophy },
    { label: "Actividades", path: paths.tasks, icon: CheckSquare },
    { label: "Experiencias", path: paths.experiences, icon: Briefcase },
  ];

  return (
    <>
      {isLoggingOut && <Loading isFullPage={true} />}

      <aside
        className={`
          bg-black text-white flex flex-col
          transition-all duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-20"} 
        `}
      >
        {/* Header */}
        <div
          className={`p-4 flex items-center ${
            isOpen ? "justify-between" : "justify-center"
          }`}
        >
          {isOpen && (
            <div className="transition-opacity duration-300">
              <h2 className="text-xl font-bold">Portafolio</h2>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="text-white hover:bg-gray-800"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Navegación */}
        <nav className="flex flex-col gap-2 px-3 mt-4 flex-1">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              onClick={() => navigate(item.path)}
              className={`
                flex items-center transition-all
                ${isOpen ? "justify-start px-4" : "justify-center px-0"}

                ${
                  location.pathname === item.path
                    ? "bg-blue-600 text-white"
                    : "text-white hover:bg-gray-800 hover:text-white"
                }
              `}
              title={!isOpen ? item.label : ""}
            >
              <item.icon className={`w-5 h-5 ${isOpen ? "mr-3" : "mr-0"}`} />
              {isOpen && <span className="truncate">{item.label}</span>}
            </Button>
          ))}
        </nav>

        {/* Footer con Dropdown */}
        <div className="p-4 border-t border-gray-800">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`
        w-full flex items-center gap-2 p-2 rounded-md
        hover:bg-gray-800 transition cursor-pointer
        ${isOpen ? "justify-between" : "justify-center"}
      `}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="bg-purple-600 min-w-[32px] h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0">
                  {getInitials(user)}
                </div>

                {isOpen && (
                  <div className="flex flex-col overflow-hidden text-left">
                    <span className="text-sm truncate">{user.first_name}</span>
                    <span className="text-xs text-gray-400 truncate">
                      {user.email}
                    </span>
                  </div>
                )}
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="top"
              align="end"
              className="w-48 bg-black border border-gray-800 text-white shadow-lg"
            >
              {/* Info del usuario (como en shadcn docs) */}
              <div className="px-3 py-2 border-b border-gray-800">
                <p className="text-sm font-medium">{user.first_name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>

              <DropdownMenuItem
                onClick={() => navigate("/profile")}
                className="cursor-pointer hover:bg-gray-800"
              >
                Perfil
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-500 hover:bg-gray-800 focus:text-red-500"
              >
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
    </>
  );
}
