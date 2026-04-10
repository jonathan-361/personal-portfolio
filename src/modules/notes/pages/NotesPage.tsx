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

export default function NotesPage() {
  const [user] = useState<User>(userMock);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar user={user} />
      <h1>Notes Pages</h1>
    </div>
  );
}
