// @/components/custom/CustomAside.tsx
import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface CustomAsideProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  isOpen?: boolean;
  onClose?: () => void;
  isFloating?: boolean;
  headerAction?: ReactNode;
  width?: string;
  className?: string; // Prop opcional para estilos extra
}

export function CustomAside({
  children,
  title,
  subtitle,
  isOpen = true,
  onClose,
  isFloating = true,
  headerAction,
  width = "w-96",
  className = "",
}: CustomAsideProps) {
  // Si es flotante y está cerrado, no renderizamos nada
  if (!isOpen && isFloating) return null;

  const hasHeader = title || subtitle || headerAction || onClose;

  const asideContent = (
    <aside
      className={`
        ${width} h-full bg-black border-l border-gray-800 flex flex-col shadow-2xl z-50
        ${
          isFloating
            ? "animate-in slide-in-from-right duration-300"
            : "hidden lg:flex" // Se oculta en móvil, aparece en desktop (1024px+)
        }
        ${className}
      `}
      onClick={(e) => e.stopPropagation()}
    >
      {hasHeader && (
        <header className="p-6 border-b border-gray-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {headerAction}
            {(title || subtitle) && (
              <div className="space-y-0.5">
                {title && (
                  <h2 className="text-xl font-bold text-white leading-none">
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="text-[10px] uppercase tracking-widest font-black text-gray-500">
                    {subtitle}
                  </p>
                )}
              </div>
            )}
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-500 hover:text-white hover:bg-gray-900"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </header>
      )}

      <div
        className={`flex-1 overflow-y-auto p-6 custom-scrollbar ${!hasHeader ? "pt-8" : ""}`}
      >
        {children}
      </div>
    </aside>
  );

  if (isFloating) {
    return (
      <div
        className="fixed inset-0 z-50 flex justify-end bg-gray-600/10 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      >
        {asideContent}
      </div>
    );
  }

  return asideContent;
}
