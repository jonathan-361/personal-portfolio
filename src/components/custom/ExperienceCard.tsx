import { Briefcase, Calendar } from "lucide-react";
import { formatDate } from "@/lib/formatters";
import type { Experience } from "@/modules/experiences/models/experience.model";

interface ExperienceCardProps {
  exp: Experience;
  onClick: () => void;
}

export function ExperienceCard({ exp, onClick }: ExperienceCardProps) {
  const isCurrent = !exp.end_date;

  const styles = {
    cardBg: "bg-gradient-to-br from-gray-900/40 to-blue-900/10",
    cardBorder: "border-blue-900/30",
    topBorder: "border-t-blue-500",
    iconColor: isCurrent ? "text-white" : "text-blue-400",
    iconBg: isCurrent
      ? "bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
      : "bg-blue-600/10 border border-blue-500/20",
  };

  return (
    <div
      onClick={onClick}
      className="relative pl-14 group cursor-pointer transition-all duration-300 active:scale-[0.99]"
    >
      <div className="absolute left-0 top-1 z-10">
        <div
          className={`w-12 h-12 rounded-full border-4 border-[#0a0a0a] flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${styles.iconBg}`}
        >
          <Briefcase className={`w-5 h-5 ${styles.iconColor}`} />
        </div>
      </div>

      <div
        className={`
        relative overflow-hidden
        ${styles.cardBg} border ${styles.cardBorder} border-t-4 ${styles.topBorder}
        p-6 rounded-2xl shadow-xl transition-all duration-300 
        hover:bg-gray-800/40 hover:shadow-2xl hover:border-blue-500/40
      `}
      >
        <div className="absolute -inset-px opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4 relative z-10">
          <div className="min-w-0 flex-1">
            <h3
              className={`text-xl font-bold transition-colors truncate ${isCurrent ? "text-blue-400" : "text-white group-hover:text-blue-300"}`}
            >
              {exp.position}
            </h3>
            <p className="text-gray-300 font-medium truncate flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
              {exp.company}
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-gray-800 text-[10px] font-bold text-gray-400 uppercase tracking-widest w-fit h-fit shrink-0 backdrop-blur-md">
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            <span>{exp.start_date ? formatDate(exp.start_date) : "---"}</span>
            <span className="text-gray-600 mx-1">—</span>
            <span className={isCurrent ? "text-blue-400 font-black" : ""}>
              {exp.end_date ? formatDate(exp.end_date) : "Actualidad"}
            </span>
          </div>
        </div>

        <p
          className={`
          text-gray-400/80 text-sm leading-relaxed border-l-2 border-white/10 pl-4 py-1 italic 
          transition-colors group-hover:border-blue-500/30
          line-clamp-2 overflow-hidden text-ellipsis
        `}
        >
          {exp.description || "Sin descripción de responsabilidades."}
        </p>
      </div>
    </div>
  );
}
