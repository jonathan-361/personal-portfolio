import type {
  User,
  Note,
  Achievement,
  Task,
  Experience,
} from "./dashboard.types";

export const userMock: User = {
  id: 1,
  first_name: "Ana",
  last_name: "Navarrete",
  second_last_name: "López",
  email: "ana@estudiante.uady.mx",
  role: "USER",
  created_at: "2025-03-01T10:00:00Z",
};

export const notesMock: Note[] = [
  {
    id: 1,
    title: "Algoritmos de ordenamiento",
    content: "Quicksort vs Mergesort...",
    user_id: 1,
    created_at: "2025-03-24T10:00:00Z",
    updated_at: "2025-03-24T10:00:00Z",
  },
];

export const achievementsMock: Achievement[] = [
  {
    id: 1,
    title: "Hackathon UADY 2025 — 2° lugar",
    description: "Proyecto de movilidad urbana",
    user_id: 1,
    achieved_at: "2025-03-15",
    created_at: "2025-03-15T00:00:00Z",
  },
];

export const tasksMock: Task[] = [
  {
    id: 1,
    title: "Entregar práctica de BD",
    description: "Normalización y SQL",
    user_id: 1,
    task_date: "2025-03-28",
    created_at: "2025-03-20T00:00:00Z",
  },
];

export const experiencesMock: Experience[] = [
  {
    id: 1,
    company: "IMSS Mérida",
    position: "Servicio Social",
    description: "Soporte de sistemas",
    user_id: 1,
    start_date: "2025-02-01",
    end_date: null,
    created_at: "2025-02-01T00:00:00Z",
  },
];
