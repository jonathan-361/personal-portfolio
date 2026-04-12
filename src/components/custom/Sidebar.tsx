import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { toast } from "sonner";
import { authService } from "@/modules/core/services/auth-services/auth.services";
import { useAuth } from "@/modules/core/context/AuthContext";
import paths from "@/modules/core/routes/paths/path";
import { useSidebarStore } from "@/modules/core/store/sidebar.store";

import type { User } from "@/modules/home/models/user.model";
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
  LayoutDashboard,
  Users,
} from "lucide-react";
import { getInitials } from "@/lib/getInitials";
import { getFirstNameLastName } from "@/lib/getFirstNameLastName";

export function Sidebar({ user }: { user: User }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout: contextLogout } = useAuth();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isOpen, toggle } = useSidebarStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      authService.logout();
      contextLogout();
      toast.success("Sesión cerrada correctamente");
      navigate(paths.login, { replace: true });
    } catch (error) {
      toast.error("Error al cerrar sesión");
      setIsLoggingOut(false);
    }
  };

  if (!mounted || !user) {
    return (
      <aside className="bg-black w-20 h-screen border-r border-gray-800" />
    );
  }

  const studentItems = [
    { label: "Inicio", path: paths.home, icon: Home },
    { label: "Apuntes y notas", path: paths.notes, icon: StickyNote },
    { label: "Logros", path: paths.achievement, icon: Trophy },
    { label: "Actividades", path: paths.tasks, icon: CheckSquare },
    { label: "Experiencias", path: paths.experiences, icon: Briefcase },
  ];

  const adminItems = [
    { label: "Dashboard", path: paths.adminHome, icon: LayoutDashboard },
    { label: "Directorio", path: paths.adminDirectory, icon: Users },
  ];

  const navItems = user.role === "ADMIN" ? adminItems : studentItems;

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
            <div className="animate-in fade-in duration-500">
              <h2 className="text-xl font-black tracking-tighter uppercase italic bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                {user.role === "ADMIN" ? "Admin Panel" : "Portafolio"}
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

        <nav className="flex flex-col gap-1.5 px-3 mt-4 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
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
                      ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                      : "text-gray-400 hover:bg-gray-900 hover:text-white"
                  }
                `}
                title={!isOpen ? item.label : ""}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                    isOpen ? "mr-3" : "mr-0"
                  }`}
                />
                {isOpen && (
                  <span className="text-sm font-medium truncate animate-in slide-in-from-left-2 duration-300">
                    {item.label}
                  </span>
                )}
                {!isOpen && isActive && (
                  <div className="absolute left-0 w-1.5 h-6 bg-blue-500 rounded-r-full" />
                )}
              </Button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-900 bg-[#050505]">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`
                w-full flex items-center gap-3 p-2 rounded-xl
                hover:bg-gray-900 transition-all duration-200 outline-none group
                ${isOpen ? "px-3" : "justify-center"}
              `}
            >
              <div className="relative shrink-0">
                <Avatar className="w-9 h-9 rounded-lg shadow-lg group-hover:scale-105 transition-transform border border-white/5">
                  <AvatarImage
                    src={user.profile_image_url || undefined}
                    alt={user.names}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gradient-to-tr from-blue-600 to-indigo-500 text-white text-sm font-bold rounded-lg">
                    {getInitials(user)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-black rounded-full z-10" />
              </div>

              {isOpen && (
                <div className="flex flex-col overflow-hidden text-left animate-in fade-in slide-in-from-left-2">
                  <span className="text-[13px] font-bold text-white truncate leading-tight">
                    {getFirstNameLastName(user)}
                  </span>
                  <span className="text-[10px] text-gray-500 truncate font-medium">
                    {user.role} • {user.email}
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
                  Sesión activa
                </p>
                <p className="text-sm font-bold truncate">
                  {getFirstNameLastName(user)}
                </p>
              </div>

              <DropdownMenuSeparator className="bg-gray-800" />

              <DropdownMenuItem
                onClick={() => navigate(paths.profile)}
                className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-md text-gray-400 focus:text-white focus:bg-gray-900 transition-colors"
              >
                <UserIcon className="w-4 h-4" />
                <span className="text-sm">Mi Perfil</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-md text-red-500/80 focus:text-white focus:bg-red-600/20 transition-colors"
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
