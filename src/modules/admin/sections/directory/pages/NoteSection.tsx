import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { SectionLayout } from "@/components/custom/SectionLayout";
import { CustomAside } from "@/components/custom/CustomAside";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, Loader2, ArrowLeft } from "lucide-react";
import { NoteCard } from "@/components/custom/NoteCard";
import { ViewNoteModal } from "@/components/custom/ViewNoteModal"; // Importación del modal
import { useNoteStore } from "@/modules/core/store/note.store";
import { useUserStore } from "@/modules/core/store/user.store";
import { NOTE_THEME } from "@/modules/core/data/theme.modules";
import type { Note } from "@/modules/notes/models/note.model";

export default function NoteSection() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { notes, isLoading, fetchNotes } = useNoteStore();
  const { usersList, user: admin } = useUserStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("todo");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const targetUser = useMemo(() => {
    return usersList.find((u) => u.id === Number(id));
  }, [usersList, id]);

  useEffect(() => {
    if (targetUser?.email) {
      fetchNotes(targetUser.email);
    }
  }, [targetUser?.email, fetchNotes]);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesType =
        filter === "todo" ||
        (filter === "notas" && note.note_type === "NOTA") ||
        (filter === "apuntes" && note.note_type === "APUNTE");

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

  if (!admin) return null;

  return (
    <SectionLayout
      user={admin}
      title={targetUser ? `Notas de ${targetUser.names}` : "Cargando notas..."}
      sidebarSecondary={
        <CustomAside isFloating={false} width="w-80">
          <div className="flex flex-col gap-8">
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  className="bg-[#0f0f0f] border-gray-800 text-white pl-10"
                  placeholder="Buscar en notas del alumno..."
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
      <div className="mb-6 flex">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-all group py-1 pr-4"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Volver al perfil</span>
        </button>
      </div>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500 gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          <p className="font-medium animate-pulse">Sincronizando notas...</p>
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
                No hay registros disponibles para este filtro.
              </p>
            </div>
          )}
        </div>
      )}

      <ViewNoteModal
        isOpen={!!selectedNote}
        onClose={() => setSelectedNote(null)}
        note={selectedNote}
      />
    </SectionLayout>
  );
}
