import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import type { Note, NoteType } from "@/modules/notes/models/note.model";
import { useNoteStore } from "@/modules/core/store/note.store";
import { noteService } from "@/modules/core/services/note-services/note.services";

interface NoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editNote?: Note | null;
}

export function NoteFormModal({
  isOpen,
  onClose,
  editNote,
}: NoteFormModalProps) {
  const { addNoteToStore, updateNoteInStore } = useNoteStore();
  const [loading, setLoading] = useState(false);
  const isEditing = !!editNote;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<NoteType>("APUNTE");

  useEffect(() => {
    if (isEditing && editNote) {
      setTitle(editNote.title);
      setContent(editNote.content || "");
      setType(editNote.note_type);
    } else {
      setTitle("");
      setContent("");
      setType("APUNTE");
    }
  }, [editNote, isOpen, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim())
      return toast.error("Completa todos los campos");

    setLoading(true);
    try {
      const payload = { title, content, note_type: type };

      if (isEditing && editNote) {
        await noteService.update(editNote.id, payload);
        updateNoteInStore(editNote.id, payload);
        toast.success("Nota actualizada");
      } else {
        const newNote = await noteService.create(payload);
        addNoteToStore(newNote);
        toast.success("Nota creada");
      }
      onClose();
    } catch (error) {
      toast.error("Error al procesar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-106.25 bg-black text-white border border-white/50
          shadow-[0_0_60px_rgba(255,255,255,0.1)] focus:outline-none"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEditing ? "Editar Entrada" : "Nueva Entrada"}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {isEditing
              ? "Modifica los detalles de tu nota."
              : "Crea un nuevo apunte o nota."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Título
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Patrones de Diseño"
              className="bg-gray-900 border-gray-800 focus-visible:ring-blue-600"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-medium text-gray-300">
              Tipo
            </Label>

            <Select
              value={type}
              onValueChange={(value) => {
                if (value) setType(value);
              }}
              required
            >
              <SelectTrigger className="bg-[#0f0f0f] border-gray-800 focus:ring-white/30 text-white">
                <SelectValue placeholder="Selecciona el tipo" />
              </SelectTrigger>
              <SelectContent className="bg-[#0f0f0f] border-gray-800 shadow-2xl">
                <SelectItem
                  value="APUNTE"
                  className="text-white cursor-pointer focus:bg-gray-800"
                >
                  Apunte
                </SelectItem>
                <SelectItem
                  value="NOTA"
                  className="text-white cursor-pointer focus:bg-gray-800"
                >
                  Nota
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Descripción
            </Label>
            <Textarea
              id="description"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escribe aquí el contenido..."
              required
              className="bg-gray-900 border-gray-800 focus-visible:ring-blue-600 min-h-37.5 w-full break-all whitespace-pre-wrap overflow-y-auto resize-none"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0 pt-2 bg-black">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              {loading
                ? "Guardando..."
                : isEditing
                  ? "Guardar Cambios"
                  : "Agregar Nota"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
