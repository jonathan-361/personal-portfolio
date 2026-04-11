import type {
  User,
  Note,
  Achievement,
  Task,
  Experience,
} from "./dashboard.types";

export const userMock: User = {
  id: 1,
  first_name: "Jonathan",
  last_name: "UwU",
  second_last_name: "López",
  email: "22090164@estudiante.uady.mx",
  role: "USER",
  created_at: "2025-03-01T10:00:00Z",
};

export const notesMock: Note[] = [
  {
    id: 1,
    title: "Algoritmos de ordenamiento",
    content:
      "Quicksort vs Mergesort hdjashdkjadhjashjdhjashkjdhkjashdjkhaskjhdkjashkhdkjhsajhdkjsakdhasjdhkjashdkjhasjhdjkahsjdhjkashdjhasjhdkjashkjdhkjashdjkhaskjhdkjashdkjhaskjdhjashdjhaskjd",
    type: "Nota",
    user_id: 1,
    created_at: "2025-03-24T10:00:00Z",
    updated_at: "2025-03-24T10:00:00Z",
  },
  {
    id: 2,
    title: "Algoritmos de ordenamiento2",
    content:
      "Quicksort vs Mergesort hdjashdkjadhjashjdhjashkjdhkjashdjkhaskjhdkjashkhdkjhsajhdkjsakdhasjdhkjashdkjhasjhdjkahsjdhjkashdjhasjhdkjashkjdhkjashdjkhaskjhdkjashdkjhaskjdhjashdjhaskjd",
    type: "Apunte",
    user_id: 1,
    created_at: "2026-03-24T10:00:00Z",
    updated_at: "2025-03-24T10:00:00Z",
  },
  {
    id: 3,
    title: "Algoritmos de ordenamiento3",
    content:
      "Quicksort vs Mergesort hdjashdkjadhjashjdhjashkjdhkjashdjkhaskjhdkjashkhdkjhsajhdkjsakdhasjdhkjashdkjhasjhdjkahsjdhjkashdjhasjhdkjashkjdhkjashdjkhaskjhdkjashdkjhaskjdhjashdjhaskjd",
    type: "Nota",
    user_id: 1,
    created_at: "2026-04-02T10:00:00Z",
    updated_at: "2025-03-24T10:00:00Z",
  },
  {
    id: 4,
    title: "Algoritmos de ordenamiento",
    content:
      "Quicksort vs Mergesort hdjashdkjadhjashjdhjashkjdhkjashdjkhaskjhdkjashkhdkjhsajhdkjsakdhasjdhkjashdkjhasjhdjkahsjdhjkashdjhasjhdkjashkjdhkjashdjkhaskjhdkjashdkjhaskjdhjashdjhaskjd",
    type: "Nota",
    user_id: 1,
    created_at: "2025-03-24T10:00:00Z",
    updated_at: "2025-03-24T10:00:00Z",
  },
];

export const achievementsMock: Achievement[] = [
  {
    id: 1,
    title: "Hackathon UADY 2025 — 2° lugar",
    description:
      "Proyecto de movilidad urbana utilizando React Native y algoritmos de optimización de rutas.",
    type: "Académico",
    user_id: 1,
    achieved_at: "2025-03-15",
    created_at: "2025-03-15T00:00:00Z",
  },
  {
    id: 2,
    title: "Certificación AWS Cloud Practitioner",
    description:
      "Validación de conocimientos fundamentales en la infraestructura global de Amazon Web Services.",
    type: "Profesional",
    user_id: 1,
    achieved_at: "2026-02-10",
    created_at: "2026-02-10T00:00:00Z",
  },
  {
    id: 3,
    title: "Voluntariado 'Código para Todos'",
    description:
      "Enseñanza de lógica de programación básica a jóvenes de comunidades rurales.",
    type: "Personal",
    user_id: 1,
    achieved_at: "2025-11-20",
    created_at: "2025-11-20T00:00:00Z",
  },
  {
    id: 4,
    title: "Mejor Promedio Generación 2021-2025",
    description:
      "Reconocimiento por desempeño académico sobresaliente en la Licenciatura de Software.",
    type: "Académico",
    user_id: 1,
    achieved_at: "2025-12-15",
    created_at: "2025-12-15T00:00:00Z",
  },
  {
    id: 5,
    title: "Ascenso a Desarrollador Fullstack Jr.",
    description:
      "Promoción interna en SoftTech Solutions tras completar satisfactoriamente el periodo de prueba.",
    type: "Profesional",
    user_id: 1,
    achieved_at: "2026-01-05",
    created_at: "2026-01-05T00:00:00Z",
  },
  {
    id: 6,
    title: "Maratón de Mérida 2026",
    description:
      "Finalización exitosa de los 42km con un tiempo oficial de 3h 45m.",
    type: "Personal",
    user_id: 1,
    achieved_at: "2026-01-15",
    created_at: "2026-01-15T00:00:00Z",
  },
];

export const tasksMock: Task[] = [
  {
    id: 1,
    title: "Entregar práctica de BD",
    description:
      "Normalización y SQLdasdasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaadasdasdasdsaaaaaaaaaa",
    user_id: 1,
    task_date: "2025-03-28",
    status: "PENDIENTE",
    created_at: "2025-03-20T00:00:00Z",
  },
  {
    id: 2,
    title: "Estudiar para examen de Redes",
    description: "Modelos OSI y TCP/IP",
    user_id: 1,
    task_date: "2025-04-05",
    status: "PROCESO",
    created_at: "2025-03-22T00:00:00Z",
  },
  {
    id: 3,
    title: "Configurar Servidor Nginx",
    description: "Proxy inverso y SSL",
    user_id: 1,
    task_date: "2025-03-15",
    status: "COMPLETADO",
    created_at: "2025-03-10T00:00:00Z",
  },
];

export const experiencesMock: Experience[] = [
  {
    id: 1,
    company: "Freelance",
    position: "Web Designer",
    description:
      "Creación de landing pages personalizadas y optimización de SEO para clientes locales.",
    user_id: 1,
    start_date: "2025-08-15",
    end_date: "2025-12-20",
    created_at: "2025-08-15T00:00:00Z",
  },
  {
    id: 2,
    company: "SoftTech Solutions",
    position: "Fullstack Developer Junior",
    description:
      "Desarrollo de interfaces reactivas y mantenimiento de APIs en Node.js.",
    user_id: 1,
    start_date: "2026-01-10",
    end_date: null,
    created_at: "2026-01-10T00:00:00Z",
  },
  {
    id: 3,
    company: "Universidad Autónoma de Yucatán",
    position: "Asistente de TI",
    description:
      "Mantenimiento preventivo de equipos de cómputo y gestión de redes locales. dkashdhasjhdjhaskjdkashdhasjhdjhaskjdkashdhasjhdjhaskjdkashdhasjhdjhaskjdkashdhasjhdjhaskjdkashdhasjhdjhaskjdkashdhasjhdjhaskjdkashdhasjhdjhaskjdkashdhasjhdjhaskjdkashdhasjhdjhaskjdkashdhasjhdjhaskjdkashdhasjhdjhaskjdkashdhasjhdjhaskjdkashdhasjhdjhaskjdkashdhasjhdjhaskjdkashdhasjhdjhaskjdkashdhasjhdjhaskjdkashdhasjhdjhaskjdkashdhasjhdjhaskjdkashdhasjhdjhaskjdkashdhasjhdjhaskjdkashdhasjhdjhaskjdkashdhasjhdjhaskjdkashdhasjhdjhaskj",
    user_id: 1,
    start_date: "2025-05-01",
    end_date: "2025-08-01",
    created_at: "2025-05-01T00:00:00Z",
  },
  {
    id: 4,
    company: "IMSS Mérida",
    position: "Servicio Social",
    description:
      "Soporte de sistemas y digitalización de expedientes clínicos.",
    user_id: 1,
    start_date: "2025-02-01",
    end_date: "2025-04-30",
    created_at: "2025-02-01T00:00:00Z",
  },
];
