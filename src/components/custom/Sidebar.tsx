import { useNavigate } from "react-router";
import { authService } from "@/modules/core/services/auth-services/auth.services";
import paths from "@/modules/core/routes/paths/path";

import type { User } from "@/modules/core/data/dashboard.types";
import { Button } from "@/components/ui/button";

import HamburgerMenu from "@/assets/svg/hamburger_menu_icon.svg?react";
function getInitials(user: User) {
  return `${user.first_name[0]}${user.last_name[0]}`;
}

export function Sidebar({
  user,
  isOpen,
  toggle,
}: {
  user: User;
  isOpen: boolean;
  toggle: () => void;
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate(paths.login);
  };

  return (
    <aside
      className={`
        bg-black text-white flex flex-col
        transition-all duration-300
        ${isOpen ? "w-64" : "w-16"}
      `}
    >
      {/* Header */}
      <div className="p-4 relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          className="absolute top-4 right-4 text-white hover:bg-gray-800"
        >
          <HamburgerMenu className="w-5 h-5" />
        </Button>

        {isOpen && (
          <div className="pr-10">
            <h2 className="text-xl font-bold">Portfolio</h2>
            <p className="text-xs text-gray-400 mt-1">Portfolio personal</p>
          </div>
        )}
      </div>

      {/* Navegación */}
      <nav className="flex flex-col gap-1 px-2">
        {[
          { label: "Inicio", path: paths.home },
          { label: "Notas", path: paths.notes },
          { label: "Logros", path: paths.achievement },
          { label: "Actividades", path: paths.tasks },
          { label: "Experiencias", path: paths.experiences },
        ].map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            onClick={() => navigate(item.path)}
            className="justify-start text-white hover:bg-gray-800"
          >
            {isOpen && item.label}
          </Button>
        ))}
      </nav>

      <div className="flex-1" />

      {/* Footer */}
      {isOpen && (
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center justify-between">
            {/* Usuario */}
            <div className="flex items-center gap-2">
              <div className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">
                {getInitials(user)}
              </div>
              <span className="text-sm">{user.first_name}</span>
            </div>

            {/* Logout */}
            <Button
              onClick={() => {
                try {
                  handleLogout();
                } catch (error) {
                  console.log("No se pudo cerrar sesión:", error);
                }
              }}
            >
              Cerrar sesión
            </Button>
          </div>
        </div>
      )}
    </aside>
  );
}
