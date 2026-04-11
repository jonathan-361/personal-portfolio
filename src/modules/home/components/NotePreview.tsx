import { Clock } from "lucide-react";
import { formatRelativeTime } from "@/lib/formatters";
import { NOTE_THEME } from "@/modules/core/data/theme.modules";
import type { Note } from "@/modules/core/data/dashboard.types";

export function NotePreview({ notes }: { notes: Note[] }) {
  return (
    <div className="space-y-4">
      {notes.slice(0, 3).map((note) => {
        const config = NOTE_THEME[note.type as keyof typeof NOTE_THEME];
        return (
          <div key={note.id} className="flex items-start gap-3 p-1 group">
            <div
              className={`w-1 h-8 rounded-full shrink-0 ${config.theme.dot}`}
            />
            <div className="min-w-0">
              <h4 className="text-sm font-medium text-gray-200 truncate group-hover:text-white transition-colors">
                {note.title}
              </h4>
              <p className="text-[10px] text-gray-500 flex items-center gap-1.5 uppercase font-bold tracking-wider">
                {note.type} • <Clock className="w-2.5 h-2.5" />{" "}
                {formatRelativeTime(note.created_at)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
