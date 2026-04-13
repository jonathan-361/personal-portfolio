import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StickyNote, FileText, Clock } from "lucide-react";
import { formatTime } from "@/lib/formatters";
import { NOTE_THEME } from "@/modules/core/data/theme.modules";
import type { Note } from "@/modules/notes/models/note.model";

interface NoteCardProps {
  note: Note;
  onClick: () => void;
}

export function NoteCard({ note, onClick }: NoteCardProps) {
  // SOLUCIÓN AL ERROR DE COMPARACIÓN:
  // Forzamos a string para que TS no intente comparar tipos de unión literales disjuntos
  const type = String(note.note_type);

  const normalizedType =
    type === "NOTA" ? "Nota" : type === "APUNTE" ? "Apunte" : "Nota";

  const config =
    NOTE_THEME[normalizedType as keyof typeof NOTE_THEME] || NOTE_THEME.Nota;

  const Icon = normalizedType === "Apunte" ? FileText : StickyNote;

  return (
    <Card
      onClick={onClick}
      className={`
        relative overflow-hidden border-t-4 transition-all duration-300 cursor-pointer group 
        hover:shadow-2xl hover:scale-[1.01] active:scale-[0.98] select-none
        ${config.theme.border} bg-gradient-to-br from-gray-900/40 ${config.theme.gradient} border-gray-800/30
      `}
    >
      <CardHeader className="p-5 pb-2 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div
            className={`p-2 rounded-lg ${config.theme.bg} border border-white/5`}
          >
            <Icon className={`w-5 h-5 ${config.theme.text}`} />
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${config.theme.pulse}`}
            />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              {normalizedType}
            </span>
          </div>
        </div>
        <CardTitle
          className={`text-lg font-bold text-white truncate transition-colors duration-300 ${config.theme.hover}`}
        >
          {note.title || "Sin título"}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-5 pt-0 flex flex-col gap-4 relative z-10">
        <p className="text-sm text-gray-400/80 line-clamp-2 min-h-[40px] leading-relaxed italic border-l border-white/10 pl-3">
          {note.content || "Sin contenido..."}
        </p>

        <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/5">
          <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTime(note.created_at)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
