import { Briefcase, Clock } from "lucide-react";
import { getPreciseTimeElapsed } from "@/lib/dateUtils";
import type { Experience } from "@/modules/experiences/models/experience.model";

export function ExperiencePreview({ currentExp }: { currentExp?: Experience }) {
  if (!currentExp) return <FallbackEmpty />;

  // Usamos nuestro nuevo util
  const timeElapsed = getPreciseTimeElapsed(currentExp.start_date);

  return (
    <div className="space-y-5 p-1">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600/10 rounded-xl border border-blue-500/20">
            <Briefcase className="w-5 h-5 text-blue-500" />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-white truncate">
              {currentExp.position}
            </h4>
            <p className="text-xs text-gray-400 truncate">
              {currentExp.company}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[9px] font-bold text-emerald-500 uppercase">
            Actual
          </span>
        </div>
      </div>

      <div className="space-y-2 bg-gray-900/40 p-3 rounded-xl border border-white/5">
        <div className="flex items-center gap-2 text-gray-400">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-xs font-medium">
            Llevas <span className="text-white">{timeElapsed}</span> en el
            puesto
          </span>
        </div>

        <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-blue-600 to-emerald-500 opacity-50"></div>
        </div>
      </div>
    </div>
  );
}

function FallbackEmpty() {
  return (
    <div className="text-center py-6">
      <p className="text-xs text-gray-500 italic">
        No hay actividad laboral en curso.
      </p>
    </div>
  );
}
