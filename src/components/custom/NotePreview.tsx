import { Clock } from "lucide-react";
import { formatRelativeTime } from "@/lib/formatters";
import { NOTE_THEME } from "@/modules/core/data/theme.modules";
import type { Note } from "@/modules/notes/models/note.model";

interface NotePreviewProps {
  notes: Note[];
}

export function NotePreview({ notes }: NotePreviewProps) {
  const recentNotes = [...notes]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 3);

  if (notes.length === 0) {
    return (
      <p className="text-xs text-gray-600 italic p-1">
        No hay notas recientes.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {recentNotes.map((note) => {
        const normalizedType =
          note.note_type.charAt(0).toUpperCase() +
          note.note_type.slice(1).toLowerCase();

        const config =
          NOTE_THEME[normalizedType as keyof typeof NOTE_THEME] ||
          NOTE_THEME.Nota;

        return (
          <div key={note.id} className="flex items-start gap-3 p-1 group">
            <div
              className={`w-1 h-8 rounded-full shrink-0 ${config.theme.dot} transition-transform duration-300 group-hover:scale-y-110`}
            />

            <div className="min-w-0">
              <h4 className="text-sm font-medium text-gray-200 truncate group-hover:text-white transition-colors">
                {note.title}
              </h4>

              <p className="text-[10px] flex items-center gap-1.5 uppercase font-bold tracking-wider">
                <span className={config.theme.text}>{normalizedType}</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-500 flex items-center gap-1.5">
                  <Clock className="w-2.5 h-2.5" />
                  {formatRelativeTime(note.created_at)}
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
