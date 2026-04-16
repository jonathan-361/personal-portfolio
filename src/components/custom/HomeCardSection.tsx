import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

interface HomeCardSectionProps {
  title: string;
  path?: string;
  children: React.ReactNode;
}

export function HomeCardSection({
  title,
  path,
  children,
}: HomeCardSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-lg font-bold text-white/90 tracking-tight">
          {title}
        </h3>
        {path && (
          <Link
            to={path}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 group"
          >
            Ver todas
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
      <div className="bg-gray-900/20 border border-gray-800/50 rounded-2xl p-4 min-h-[170px] flex flex-col justify-center">
        <div className="space-y-3">{children}</div>
      </div>
    </div>
  );
}
