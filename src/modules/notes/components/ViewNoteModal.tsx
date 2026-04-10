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
import { Clock, Pencil } from "lucide-react";
import type { Note } from "@/modules/core/data/dashboard.types";
import { formatDate } from "@/lib/formatters";

interface ViewNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: Note | null;
  onEdit: (note: Note) => void;
}

export function ViewNoteModal({
  isOpen,
  onClose,
  note,
  onEdit,
}: ViewNoteModalProps) {
  if (!note) return null;

  const isApunte = note.type === "Apunte";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] bg-black border-gray-800 text-white shadow-[0_0_50px_rgba(0,0,0,0.8)] focus:outline-none overflow-hidden">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between pr-8">
            <Badge
              variant="outline"
              className={`uppercase tracking-widest text-[10px] px-3 py-1 border-opacity-50 ${
                isApunte
                  ? "border-blue-500 text-blue-400 bg-blue-500/10"
                  : "border-purple-500 text-purple-400 bg-purple-500/10"
              }`}
            >
              {note.type}
            </Badge>
            <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatDate(note.created_at)}</span>
            </div>
          </div>

          <DialogTitle className="text-2xl font-bold break-words leading-tight pr-8">
            {note.title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Visualización de nota
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 border-t border-gray-900 pt-6">
          <div className="max-h-[45vh] overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar">
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap break-all md:break-words text-base">
              {note.content || "Sin contenido adicional."}
            </p>
          </div>
        </div>

        <DialogFooter className="mt-6 pt-4 border-t border-gray-900 bg-black">
          <Button
            onClick={() => onEdit(note)}
            variant="outline"
            className="w-full bg-gray-900 border-gray-800 text-gray-300 hover:bg-gray-800 hover:text-white gap-2 transition-all active:scale-[0.98]"
          >
            <Pencil className="w-4 h-4" />
            Editar {note.type}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
