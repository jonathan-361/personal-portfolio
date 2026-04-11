import { Briefcase } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { Experience } from "@/modules/core/data/dashboard.types";

export function ExperiencePreview({ currentExp }: { currentExp?: Experience }) {
  if (!currentExp) {
    return (
      <div className="text-center py-4 px-6 space-y-2">
        <p className="text-sm text-blue-400 font-medium italic">
          "El éxito es la suma de pequeños esfuerzos repetidos."
        </p>
        <p className="text-[10px] text-gray-600 uppercase font-bold tracking-tighter">
          ¡Sigue construyendo tu futuro!
        </p>
      </div>
    );
  }

  const progress = Math.round((new Date().getDate() / 31) * 100);

  return (
    <div className="space-y-4 p-1">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-blue-600/10 rounded-xl border border-blue-500/20">
          <Briefcase className="w-5 h-5 text-blue-500" />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-white truncate">
            {currentExp.position}
          </h4>
          <p className="text-xs text-gray-400 truncate">{currentExp.company}</p>
        </div>
      </div>
      <div className="space-y-2">
        <Progress value={progress} className="h-1.5 bg-gray-800" />
        <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest">
          <span>
            {new Date().toLocaleString("es-ES", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="text-blue-400">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
