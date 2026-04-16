import { Briefcase, Clock, CalendarDays } from "lucide-react";
import { getPreciseTimeElapsed } from "@/lib/dateUtils";
import type { Experience } from "@/modules/experiences/models/experience.model";

export function ExperiencePreview({ currentExp }: { currentExp?: Experience }) {
  // Manejo de estado vacío si no hay experiencia
  if (!currentExp) return <FallbackEmpty />;

  // Se considera actual si NO tiene fecha de finalización (null/undefined)
  const isCurrent = !currentExp.end_date;
  const timeElapsed = getPreciseTimeElapsed(currentExp.start_date);

  return (
    <div className="space-y-5 p-1">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-xl border ${
              isCurrent
                ? "bg-blue-600/10 border-blue-500/20"
                : "bg-gray-600/10 border-white/10"
            }`}
          >
            <Briefcase
              className={`w-5 h-5 ${isCurrent ? "text-blue-500" : "text-gray-500"}`}
            />
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

        {/* Badge dinámico según el estado del empleo */}
        {isCurrent ? (
          <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[9px] font-bold text-emerald-500 uppercase">
              Actual
            </span>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 px-2 py-1 rounded-md">
            <span className="text-[9px] font-bold text-gray-400 uppercase">
              Último Trabajo
            </span>
          </div>
        )}
      </div>

      <div className="space-y-2 bg-gray-900/40 p-3 rounded-xl border border-white/5">
        <div className="flex items-center gap-2 text-gray-400">
          {isCurrent ? (
            <>
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs font-medium">
                Lleva <span className="text-white">{timeElapsed}</span> en el
                puesto
              </span>
            </>
          ) : (
            <>
              <CalendarDays className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-xs font-medium italic">
                Finalizado el{" "}
                <span className="text-gray-300">
                  {currentExp.end_date?.split("T")[0] || "Fecha no definida"}
                </span>
              </span>
            </>
          )}
        </div>

        {isCurrent && (
          <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-blue-600 to-emerald-500 opacity-50"></div>
          </div>
        )}
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
