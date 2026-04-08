import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  size?: number;
  isFullPage?: boolean;
}

export default function Loading({
  className,
  size = 48,
  isFullPage = true,
}: LoadingProps) {
  const overlayStyles =
    "fixed inset-0 z-[9999] bg-black/60 backdrop-blur-[2px]";
  const centerStyles = "flex items-center justify-center min-h-screen w-full";

  return (
    <div
      className={cn(isFullPage ? overlayStyles : "", centerStyles, className)}
    >
      <div className="flex flex-col items-center gap-4">
        <Loader2 size={size} className="animate-spin text-white" />
        {isFullPage && (
          <span className="text-white text-sm font-medium animate-pulse">
            Cargando...
          </span>
        )}
      </div>
    </div>
  );
}
