import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { SectionLayout } from "@/components/custom/SectionLayout";
import { CustomAside } from "@/components/custom/CustomAside";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, Loader2, ArrowLeft } from "lucide-react";
import { NoteCard } from "@/components/custom/NoteCard";
import { ViewNoteModal } from "@/components/custom/ViewNoteModal";
import { useNoteStore } from "@/modules/core/store/note.store";
import { useUserStore } from "@/modules/core/store/user.store";
import { NOTE_THEME } from "@/modules/core/data/theme.modules";
import type { Note } from "@/modules/notes/models/note.model";

// Importaciones de Paginación de Shadcn/UI
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function NoteSection() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Store y Estados
  const { notes, isLoading, fetchNotes } = useNoteStore();
  const { usersList, user: admin } = useUserStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("todo");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Estados de Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 6; // Ajusta según prefieras (3x2, 3x3, etc.)

  const targetUser = useMemo(() => {
    return usersList.find((u) => u.id === Number(id));
  }, [usersList, id]);

  useEffect(() => {
    if (targetUser?.email) {
      fetchNotes(targetUser.email);
    }
  }, [targetUser?.email, fetchNotes]);

  // 1. Filtrado lógico (Búsqueda + Tipo)
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

  // 2. Resetear a página 1 si cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchQuery]);

  // 3. Cálculos de paginación local
  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
  const startIndex = (currentPage - 1) * notesPerPage;
  const currentNotesSlice = filteredNotes.slice(
    startIndex,
    startIndex + notesPerPage,
  );

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
        <div className="flex flex-col gap-8 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentNotesSlice.length > 0 ? (
              currentNotesSlice.map((note) => (
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

          {/* Renderizado Condicional de Paginación */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer text-gray-400 hover:text-white hover:bg-gray-900"
                    }
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  />
                </PaginationItem>

                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem
                    key={i + 1}
                    className="hidden sm:inline-block"
                  >
                    <PaginationLink
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className="cursor-pointer border-gray-800 text-gray-400 aria-[current]:bg-blue-600 aria-[current]:text-white"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer text-gray-400 hover:text-white hover:bg-gray-900"
                    }
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
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
