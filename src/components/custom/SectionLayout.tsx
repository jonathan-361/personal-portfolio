import { Sidebar } from "@/components/custom/Sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { User } from "@/modules/core/data/dashboard.types";

interface SectionLayoutProps {
  user: User;
  title: string;
  subtitle?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  showButton?: boolean;
  children: React.ReactNode;
  sidebarSecondary?: React.ReactNode;
}

export function SectionLayout({
  user,
  title,
  subtitle,
  buttonLabel,
  onButtonClick,
  showButton = true,
  children,
  sidebarSecondary,
}: SectionLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] text-white font-sans overflow-hidden">
      {/* Sidebar Principal */}
      <Sidebar user={user} />

      {/* Contenido Central */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0a0a0a]">
        <header className="sticky top-0 z-10 flex items-center justify-between p-8 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-900/50">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>

          {showButton && buttonLabel && (
            <Button
              onClick={onButtonClick}
              className="bg-white text-black hover:bg-gray-200 font-bold gap-2 px-6 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all animate-in fade-in zoom-in duration-300"
            >
              <Plus className="w-4 h-4" />
              {buttonLabel}
            </Button>
          )}
        </header>

        {/* Zona de Scroll */}
        <div className="flex-1 overflow-y-auto p-8 pt-4 custom-scrollbar">
          <div className="max-w-7xl mx-auto h-full">{children}</div>
        </div>
      </main>

      {/* Sidebar Secundario (Filtros en Notas, etc.) */}
      {sidebarSecondary}
    </div>
  );
}
