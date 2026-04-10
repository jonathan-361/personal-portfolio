import { Briefcase, Calendar } from "lucide-react";
import { formatDate } from "@/lib/formatters";
import type { Experience } from "@/modules/core/data/dashboard.types";

interface ExperienceCardProps {
  exp: Experience;
  onClick: () => void;
}

export function ExperienceCard({ exp, onClick }: ExperienceCardProps) {
  const isCurrent = !exp.end_date;

  return (
    <div onClick={onClick} className="relative pl-14 group cursor-pointer">
      <div className="absolute left-0 top-1">
        <div
          className={`w-12 h-12 rounded-full border-4 border-[#0a0a0a] flex items-center justify-center transition-all duration-300 ${
            isCurrent
              ? "bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
              : "bg-gray-900 group-hover:bg-gray-800"
          }`}
        >
          <Briefcase
            className={`w-5 h-5 ${isCurrent ? "text-white" : "text-gray-500"}`}
          />
        </div>
      </div>

      <div className="bg-gray-900/40 border border-gray-800/50 p-6 rounded-2xl hover:bg-gray-900/70 transition-all hover:border-gray-700 shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
          <div className="min-w-0 flex-1">
            <h3
              className={`text-xl font-bold transition-colors truncate ${isCurrent ? "text-blue-400" : "text-white group-hover:text-blue-300"}`}
            >
              {exp.position}
            </h3>
            <p className="text-gray-300 font-medium truncate">{exp.company}</p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-gray-800 text-[10px] font-bold text-gray-400 uppercase tracking-wider w-fit h-fit shrink-0">
            <Calendar className="w-3.5 h-3.5" />
            <span>{exp.start_date ? formatDate(exp.start_date) : "---"}</span>
            <span className="text-gray-600 mx-1">—</span>
            <span>
              {exp.end_date ? formatDate(exp.end_date) : "Actualidad"}
            </span>
          </div>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed border-l-2 border-gray-800 pl-4 py-1 italic break-words whitespace-pre-wrap">
          {exp.description}
        </p>
      </div>
    </div>
  );
}
