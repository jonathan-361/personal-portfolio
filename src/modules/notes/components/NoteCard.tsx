import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatTime } from "@/lib/formatters";
import type { Note } from "@/modules/core/data/dashboard.types";

interface NoteCardProps {
  note: Note;
  onClick: () => void;
}

export function NoteCard({ note, onClick }: NoteCardProps) {
  const isApunte = note.type === "Apunte";

  return (
    <Card
      onClick={onClick}
      className={`bg-gray-900/50 border-gray-800 border-t-4 w-full hover:bg-gray-800/80 transition-all duration-200 cursor-pointer group active:scale-[0.98] select-none shadow-lg ${
        isApunte ? "border-t-blue-500" : "border-t-purple-500"
      }`}
    >
      <CardHeader className="p-4 pb-2">
        <CardTitle
          className={`text-lg font-bold text-white truncate transition-colors ${
            isApunte
              ? "group-hover:text-blue-400"
              : "group-hover:text-purple-400"
          }`}
        >
          {note.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 pt-0 flex flex-col gap-4">
        <p className="text-sm text-gray-400 line-clamp-2 min-h-[40px] leading-relaxed">
          {note.content || "Sin descripción..."}
        </p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${
                isApunte ? "bg-blue-500" : "bg-purple-500"
              }`}
            />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
              {note.type}
            </span>
          </div>
          <span className="text-[11px] text-gray-500 font-medium">
            {formatTime(note.created_at)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
