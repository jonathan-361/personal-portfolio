import { useState } from "react";
import { SectionLayout } from "@/components/custom/SectionLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search } from "lucide-react";

import { NoteCard } from "@/modules/notes/components/NoteCard";
import { NoteFormModal } from "@/modules/notes/components/NoteFormModal";
import { ViewNoteModal } from "@/modules/notes/components/ViewNoteModal";
import { userMock, notesMock } from "@/modules/core/data/dashboard.data";
import type { User, Note } from "@/modules/core/data/dashboard.types";

export default function NotesPage() {
  const [user] = useState<User>(userMock);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleOpenAdd = () => {
    setSelectedNote(null);
    setIsEditMode(false);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (note: Note) => {
    setSelectedNote(note);
    setIsEditMode(true);
  };

  const handleCloseAll = () => {
    setIsFormModalOpen(false);
    setIsEditMode(false);
    setSelectedNote(null);
  };

  return (
    <SectionLayout
      user={user}
      title="Mis Notas"
      buttonLabel="Nueva Nota"
      onButtonClick={handleOpenAdd}
      sidebarSecondary={
        <aside className="w-80 h-full bg-black border-l border-gray-800 p-6 flex flex-col gap-8 hidden xl:flex">
          <div className="space-y-3">
            <Label className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Buscador
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                className="bg-[#0f0f0f] border-gray-800 text-white pl-10 focus-visible:ring-white/20"
                placeholder="Buscar..."
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Filtrar por Tipo
            </h3>
            <RadioGroup defaultValue="todo" className="gap-3">
              {[
                { id: "todo", label: "Todo", color: "bg-gray-400" },
                { id: "apuntes", label: "Apuntes", color: "bg-blue-500" },
                { id: "notas", label: "Notas", color: "bg-purple-500" },
              ].map((option) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-900 transition-colors cursor-pointer group"
                >
                  <RadioGroupItem
                    value={option.id}
                    id={option.id}
                    className="border-gray-600"
                  />
                  <Label
                    htmlFor={option.id}
                    className="flex-1 flex items-center gap-2 cursor-pointer text-sm text-gray-300 group-hover:text-white"
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
        </aside>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
        {notesMock.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onClick={() => setSelectedNote(note)}
          />
        ))}
      </div>

      <ViewNoteModal
        isOpen={!!selectedNote && !isEditMode}
        onClose={() => setSelectedNote(null)}
        note={selectedNote}
        onEdit={handleOpenEdit}
      />

      <NoteFormModal
        isOpen={isFormModalOpen || isEditMode}
        onClose={handleCloseAll}
        editNote={isEditMode ? selectedNote : null}
      />
    </SectionLayout>
  );
}
