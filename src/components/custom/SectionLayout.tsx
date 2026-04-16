import { Sidebar } from "@/components/custom/Sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { User } from "@/modules/home/models/user.model";
import { getFirstNameLastName } from "@/lib/getFirstNameLastName";

interface SectionLayoutProps {
  user: User;
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  showButton?: boolean;
  children: React.ReactNode;
  sidebarSecondary?: React.ReactNode;
  isLoadingHeader?: boolean;
  isHeaderSticky?: boolean;
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
  isLoadingHeader = false,
  isHeaderSticky = true,
}: SectionLayoutProps) {
  const displayName = getFirstNameLastName(user);

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] text-white font-sans overflow-hidden">
      <Sidebar user={user} />

      {/* Si el header NO es sticky, el scroll debe estar en este contenedor principal 
          para que el header pueda 'subir' y desaparecer.
      */}
      <main
        className={`flex-1 flex flex-col min-w-0 bg-[#0a0a0a] ${
          !isHeaderSticky ? "overflow-y-auto custom-scrollbar" : ""
        }`}
      >
        <header
          className={`flex items-center justify-between p-8 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-900/50 transition-all ${
            isHeaderSticky ? "sticky top-0 z-10" : "relative"
          }`}
        >
          <div
            className={`space-y-1 transition-all duration-300 ${
              isLoadingHeader
                ? "invisible grayscale animate-pulse pointer-events-none"
                : "visible"
            }`}
          >
            <h1
              className={`text-3xl font-bold tracking-tight ${
                isLoadingHeader ? "text-gray-500" : "text-white"
              }`}
            >
              {title || `Bienvenido, ${displayName}`}
            </h1>

            {subtitle && (
              <p
                className={`text-sm ${
                  isLoadingHeader ? "text-gray-700" : "text-gray-500"
                }`}
              >
                {subtitle}
              </p>
            )}
          </div>

          {showButton && buttonLabel && (
            <Button
              onClick={onButtonClick}
              disabled={isLoadingHeader}
              className={`bg-white text-black hover:bg-gray-200 font-bold gap-2 px-6 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all animate-in fade-in zoom-in duration-300 ${
                isLoadingHeader
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              <Plus className="w-4 h-4" />
              {buttonLabel}
            </Button>
          )}
        </header>

        {/* Si el header ES sticky, el scroll se queda solo en este div. 
            Si NO es sticky, este div deja que el scroll lo maneje el 'main'.
        */}
        <div
          className={`p-8 pt-4 ${
            isHeaderSticky ? "flex-1 overflow-y-auto custom-scrollbar" : ""
          }`}
        >
          <div className="max-w-7xl mx-auto h-full">{children}</div>
        </div>
      </main>

      {sidebarSecondary}
    </div>
  );
}
