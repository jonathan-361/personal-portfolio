import { useState, useEffect, useMemo } from "react";
import { SectionLayout } from "@/components/custom/SectionLayout";
import { CustomAside } from "@/components/custom/CustomAside";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, Loader2 } from "lucide-react";
import { NoteCard } from "@/modules/notes/components/NoteCard";
import { NoteFormModal } from "@/modules/notes/components/NoteFormModal";
import { ViewNoteModal } from "@/modules/notes/components/ViewNoteModal";
import { useUserStore } from "@/modules/core/store/user.store";
import { useNoteStore } from "@/modules/core/store/note.store";
import { NOTE_THEME } from "@/modules/core/data/theme.modules";
import type { Note } from "@/modules/notes/models/note.model";

export default function NotesPage() {
  const { user } = useUserStore();
  const { notes, isLoading, fetchMyNotes } = useNoteStore();

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("todo");

  useEffect(() => {
    fetchMyNotes();
  }, [fetchMyNotes]);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      let matchesType = false;

      if (filter === "todo") {
        matchesType = true;
      } else if (filter === "notas") {
        matchesType = note.note_type === "NOTA";
      } else if (filter === "apuntes") {
        matchesType = note.note_type === "APUNTE";
      }

      const matchesSearch =
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesType && matchesSearch;
    });
  }, [notes, filter, searchQuery]);

  const filterOptions = [
    { id: "todo", label: "Todo", color: "bg-gray-400" },
    {
      id: "apuntes",
      label: NOTE_THEME.Apunte.label,
      color: NOTE_THEME.Apunte.theme.dot,
    },
    {
      id: "notas",
      label: NOTE_THEME.Nota.label,
      color: NOTE_THEME.Nota.theme.dot,
    },
  ];

  if (!user) return null;

  return (
    <SectionLayout
      user={user as any}
      title="Mis Notas"
      buttonLabel="Nueva Nota"
      onButtonClick={() => {
        setSelectedNote(null);
        setIsEditMode(false);
        setIsFormModalOpen(true);
      }}
      sidebarSecondary={
        <CustomAside isFloating={false} width="w-80">
          <div className="flex flex-col gap-8">
            {/* BÚSQUEDA */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  className="bg-[#0f0f0f] border-gray-800 text-white pl-10"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <RadioGroup
                value={filter}
                onValueChange={setFilter}
                className="gap-3"
              >
                {filterOptions.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-900 cursor-pointer group"
                  >
                    <RadioGroupItem
                      value={option.id}
                      id={option.id}
                      className="border-gray-600 text-blue-500"
                    />
                    <Label
                      htmlFor={option.id}
                      className="flex-1 flex items-center gap-2 text-sm text-gray-300 group-hover:text-white cursor-pointer"
                    >
                      <span
                        className={`w-1.5 h-4 rounded-full ${option.color}`}
                      />
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </CustomAside>
      }
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500 gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          <p className="font-medium animate-pulse">Cargando tus apuntes...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onClick={() => setSelectedNote(note)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20 border-2 border-dashed border-gray-900 rounded-3xl">
              <p className="text-gray-600">
                No se encontraron notas que coincidan con el filtro.
              </p>
            </div>
          )}
        </div>
      )}
      <ViewNoteModal
        isOpen={!!selectedNote && !isEditMode}
        onClose={() => setSelectedNote(null)}
        note={selectedNote as any}
        onEdit={(n) => {
          setSelectedNote(n as any);
          setIsEditMode(true);
        }}
      />
      <NoteFormModal
        isOpen={isFormModalOpen || isEditMode}
        onClose={() => {
          setIsFormModalOpen(false);
          setIsEditMode(false);
          setSelectedNote(null);
        }}
        editNote={isEditMode ? (selectedNote as any) : null}
      />
    </SectionLayout>
  );
}
