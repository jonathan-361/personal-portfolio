import { Clock, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Note } from "@/modules/notes/models/note.model";
import { formatDate } from "@/lib/formatters";
import { NOTE_THEME } from "@/modules/core/data/theme.modules";

interface ViewNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note | null;
  onEdit?: (note: Note) => void;
  onDelete?: (note: Note) => void;
}

export function ViewNoteModal({
  isOpen,
  onClose,
  note,
  onEdit,
  onDelete,
}: ViewNoteModalProps) {
  if (!note) return null;

  const typeStr = String(note.note_type);
  const normalizedType =
    typeStr === "NOTA" ? "Nota" : typeStr === "APUNTE" ? "Apunte" : "Nota";

  const config =
    NOTE_THEME[normalizedType as keyof typeof NOTE_THEME] || NOTE_THEME.Nota;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-137.5 bg-black border-gray-800 text-white shadow-[0_0_50px_rgba(0,0,0,0.8)] focus:outline-none overflow-hidden">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between pr-8">
            <Badge
              variant="outline"
              className={`uppercase tracking-widest text-[10px] px-3 py-1 border-opacity-50 ${config.theme.border} ${config.theme.text} ${config.theme.bg}`}
            >
              {normalizedType}
            </Badge>

            <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatDate(note.created_at)}</span>
            </div>
          </div>

          <DialogTitle className="text-2xl font-bold wrap-break-word leading-tight pr-8">
            {note.title}
          </DialogTitle>

          <DialogDescription className="sr-only">
            Visualización de nota
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 border-t border-gray-900 pt-6">
          <div className="max-h-[45vh] overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar">
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap break-all md:wrap-break-word text-base">
              {note.content || "Sin contenido adicional."}
            </p>
          </div>
        </div>

        {(onEdit || onDelete) && (
          <DialogFooter className="mt-6 pt-4 border-t border-gray-900 bg-black flex flex-col sm:flex-row gap-2">
            {onDelete && (
              <Button
                onClick={() => onDelete(note)}
                variant="ghost"
                className="w-full sm:w-auto flex-1 text-red-500 hover:bg-red-600/10 hover:text-white gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar
              </Button>
            )}

            {onEdit && (
              <Button
                onClick={() => onEdit(note)}
                variant="outline"
                className="w-full sm:w-auto flex-1 bg-gray-900 border-gray-800 text-gray-300 hover:bg-gray-800 hover:text-white gap-2 transition-all active:scale-[0.98]"
              >
                <Pencil className="w-4 h-4" />
                Editar {normalizedType}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
