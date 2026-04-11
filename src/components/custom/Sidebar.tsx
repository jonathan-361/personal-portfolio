import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { toast } from "sonner";
import { authService } from "@/modules/core/services/auth-services/auth.services";
import paths from "@/modules/core/routes/paths/path";
import { useSidebarStore } from "@/modules/core/store/sidebar.store";

import type { User } from "@/modules/core/data/dashboard.types";
import { Button } from "@/components/ui/button";
import Loading from "@/components/custom/Loading";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import {
  Home,
  StickyNote,
  Trophy,
  CheckSquare,
  Briefcase,
  Menu,
  User as UserIcon,
  LogOut,
} from "lucide-react";
import { getInitials } from "@/lib/getInitials";

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
    { label: "Apuntes y notas", path: paths.notes, icon: StickyNote },
    { label: "Logros", path: paths.achievement, icon: Trophy },
    { label: "Actividades", path: paths.tasks, icon: CheckSquare },
    { label: "Experiencias", path: paths.experiences, icon: Briefcase },
  ];

  return (
    <>
      {isLoggingOut && <Loading isFullPage={true} />}

      <aside
        className={`
          bg-black text-white flex flex-col h-screen sticky top-0
          z-50 border-r border-gray-800 transition-[width] duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-20"} 
        `}
      >
        <div
          className={`p-6 flex items-center ${
            isOpen ? "justify-between" : "justify-center"
          }`}
        >
          {isOpen && (
            <div>
              <h2 className="text-xl font-black tracking-tighter uppercase italic">
                Portafolio
              </h2>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Navegación Principal */}
        <nav className="flex flex-col gap-1.5 px-3 mt-4 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.label}
                variant="ghost"
                onClick={() => navigate(item.path)}
                className={`
                  relative flex items-center group transition-all duration-200
                  ${isOpen ? "justify-start px-4 h-11" : "justify-center px-0 h-12"}
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                      : "text-gray-400 hover:bg-gray-900 hover:text-white"
                  }
                `}
                title={!isOpen ? item.label : ""}
              >
                <item.icon
                  className={`w-5 h-5 shrink-0 ${isOpen ? "mr-3" : "mr-0"}`}
                />
                {isOpen && (
                  <span className="text-sm font-medium truncate">
                    {item.label}
                  </span>
                )}
                {!isOpen && isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full" />
                )}
              </Button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-900 bg-[#050505]">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`
        w-full flex items-center gap-3 p-2 rounded-xl
        hover:bg-gray-900 transition-all duration-200 outline-none group
        ${isOpen ? "px-3" : "justify-center"}
      `}
            >
              <div className="relative">
                <Avatar className="w-9 h-9 rounded-lg shadow-lg group-hover:scale-105 transition-transform border border-white/5">
                  <AvatarImage
                    src={user.image}
                    alt={user.first_name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gradient-to-tr from-purple-600 to-blue-500 text-white text-sm font-bold rounded-lg">
                    {getInitials(user)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-black rounded-full z-10" />
              </div>

              {isOpen && (
                <div className="flex flex-col overflow-hidden text-left">
                  <span className="text-[13px] font-bold text-white truncate leading-tight">
                    {user.first_name} {user.last_name}
                  </span>
                  <span className="text-[10px] text-gray-500 truncate font-medium">
                    {user.email}
                  </span>
                </div>
              )}
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side={isOpen ? "top" : "right"}
              align="end"
              sideOffset={12}
              className="w-56 bg-black border border-gray-800 text-white shadow-2xl p-1.5"
            >
              <div className="px-2.5 py-2 mb-1">
                <p className="text-[10px] uppercase tracking-widest font-black text-gray-500 mb-0.5">
                  Cuenta
                </p>
                <p className="text-sm font-bold truncate">
                  {user.first_name} {user.last_name}
                </p>
              </div>

              <DropdownMenuSeparator className="bg-gray-800" />

              <DropdownMenuItem
                onClick={() => navigate(paths.profile)}
                className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-md text-gray-400 !focus:text-white focus:bg-gray-300 transition-colors"
              >
                <UserIcon className="w-4 h-4" />
                <span className="text-sm">Perfil</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-md text-red-500/80 !focus:text-white focus:bg-red-600 transition-colors hover:text-white"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
    </>
  );
}
