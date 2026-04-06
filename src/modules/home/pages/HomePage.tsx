import { useState } from "react";
import { Sidebar } from "@/components/custom/Sidebar";

import {
  userMock,
  notesMock,
  achievementsMock,
  tasksMock,
  experiencesMock,
} from "@/modules/core/data/dashboard.data";

import type {
  User,
  Note,
  Achievement,
  Task,
  Experience,
} from "@/modules/core/data/dashboard.types";
import { toast } from "sonner";

// Helpers
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-MX");
}

export default function HomePage() {
  const [user] = useState<User>(userMock);
  const [notes] = useState<Note[]>(notesMock);
  const [achievements] = useState<Achievement[]>(achievementsMock);
  const [tasks] = useState<Task[]>(tasksMock);
  const [experiences] = useState<Experience[]>(experiencesMock);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        user={user}
        isOpen={sidebarOpen}
        toggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">Hola, {user.first_name}</h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded shadow">
            Notas: {notes.length}
          </div>
          <div className="bg-white p-4 rounded shadow">
            Logros: {achievements.length}
          </div>
          <div className="bg-white p-4 rounded shadow">
            Tareas: {tasks.length}
          </div>
          <div className="bg-white p-4 rounded shadow">
            Experiencias: {experiences.length}
          </div>
        </div>

        {/* Notas */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Notas</h2>
          {notes.map((n) => (
            <p key={n.id}>
              {n.title} - {formatDate(n.created_at)}
            </p>
          ))}
        </div>
      </main>
    </div>
  );
}
