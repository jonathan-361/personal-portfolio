import {
  FileText,
  StickyNote,
  GraduationCap,
  Briefcase,
  Star,
  Trophy,
  CheckSquare,
} from "lucide-react";

// Tema de Login y Register
export const AUTH_THEME = {
  login: {
    title: "text-white",
    accent: "text-indigo-500",
    button:
      "bg-indigo-600 hover:bg-indigo-700 shadow-[0_0_20px_rgba(79,70,229,0.2)]",
    link: "text-indigo-400 hover:text-indigo-300",
    input:
      "bg-black/40 border-gray-800 focus:border-cyan-500/50 text-white placeholder:text-gray-500",
    label: "text-gray-400",
    border: "border-t-4 border-t-indigo-500",
    glow: "shadow-[0_0_40px_rgba(79,70,229,0.1)]",
    labelField: "text-white/90",
  },
  register: {
    title: "text-white",
    accent: "text-cyan-500",
    button:
      "bg-cyan-600 hover:bg-cyan-700 shadow-[0_0_20px_rgba(6,182,212,0.2)]",
    link: "text-cyan-400 hover:text-cyan-300",
    input:
      "bg-black/40 border-gray-800 focus:border-cyan-500/50 text-white placeholder:text-gray-500",
    label: "text-gray-400",
    border: "border-t-4 border-t-cyan-500",
    glow: "shadow-[0_0_40px_rgba(6,182,212,0.1)]",
    labelField: "text-white/90",
  },
} as const;

// Tipo de color para el módulo de notas
export const NOTE_THEME = {
  Apunte: {
    color: "purple",
    icon: FileText,
    label: "Apuntes",
    theme: {
      border: "border-purple-500",
      bg: "bg-purple-600/10",
      gradient: "to-purple-900/10",
      text: "text-purple-400",
      hover: "group-hover:text-purple-400",
      pulse: "bg-purple-500",
      dot: "bg-purple-500",
    },
  },
  Nota: {
    color: "amber",
    icon: StickyNote,
    label: "Notas",
    theme: {
      border: "border-amber-500",
      bg: "bg-amber-600/10",
      gradient: "to-amber-900/10",
      text: "text-amber-400",
      hover: "group-hover:text-amber-400",
      pulse: "bg-amber-500",
      dot: "bg-amber-500",
    },
  },
} as const;

// Tipo de color e iconos para el módulo de logros
export const ACHIEVEMENT_THEME = {
  Académico: {
    icon: GraduationCap,
    label: "Académico",
    theme: {
      border: "border-blue-900/30",
      topBorder: "border-t-blue-500",
      bg: "bg-blue-600/10",
      bgStrong: "bg-blue-600/20",
      gradient: "to-blue-900/10",
      text: "text-blue-400",
      textHover: "group-hover:text-blue-300",
      button: "bg-blue-600 hover:bg-blue-700",
      iconBorder: "border-blue-600/20",
    },
  },
  Profesional: {
    icon: Briefcase,
    label: "Profesional",
    theme: {
      border: "border-emerald-900/30",
      topBorder: "border-t-emerald-500",
      bg: "bg-emerald-600/10",
      bgStrong: "bg-emerald-600/20",
      gradient: "to-emerald-900/10",
      text: "text-emerald-400",
      textHover: "group-hover:text-emerald-300",
      button: "bg-emerald-600 hover:bg-emerald-700",
      iconBorder: "border-emerald-600/20",
    },
  },
  Personal: {
    icon: Star,
    label: "Personal",
    theme: {
      border: "border-amber-900/30",
      topBorder: "border-t-amber-500",
      bg: "bg-amber-600/10",
      bgStrong: "bg-amber-600/20",
      gradient: "to-amber-900/10",
      text: "text-amber-400",
      textHover: "group-hover:text-amber-300",
      button: "bg-amber-600 hover:bg-amber-700",
      iconBorder: "border-amber-600/20",
    },
  },
} as const;

// Temas simplificados para las estadísticas
export const STATS_THEME = {
  notes: {
    icon: StickyNote,
    color: "text-purple-400",
    bg: "bg-purple-500",
    border: "border-t-purple-500",
    gradient: "to-purple-900/10",
  },
  achievements: {
    icon: Trophy,
    color: "text-amber-400",
    bg: "bg-amber-500",
    border: "border-t-amber-500",
    gradient: "to-amber-900/10",
  },
  tasks: {
    icon: CheckSquare,
    color: "text-blue-400",
    bg: "bg-blue-500",
    border: "border-t-blue-500",
    gradient: "to-blue-900/10",
  },
  experiences: {
    icon: Briefcase,
    color: "text-emerald-400",
    bg: "bg-emerald-500",
    border: "border-t-emerald-500",
    gradient: "to-emerald-900/10",
  },
} as const;

// Temas simplificados para las tareas
export const TASK_STATUS_THEME = {
  PENDIENTE: {
    label: "Pendientes",
    color: "blue",
    iconColor: "text-blue-400",
    border: "border-blue-500",
    borderT: "border-t-blue-500",
    bg: "bg-blue-600/10",
    bgStrong: "bg-blue-600/20",
    gradient: "from-gray-900/40 to-blue-900/10",
    cardBorder: "border-blue-900/30",
  },
  "EN PROCESO": {
    label: "En Proceso",
    color: "amber",
    iconColor: "text-amber-400",
    border: "border-amber-500",
    borderT: "border-t-amber-500",
    bg: "bg-amber-600/10",
    bgStrong: "bg-amber-600/20",
    gradient: "from-gray-900/40 to-amber-900/10",
    cardBorder: "border-amber-900/30",
  },
  COMPLETADO: {
    label: "Completado",
    color: "emerald",
    iconColor: "text-emerald-400",
    border: "border-emerald-500",
    borderT: "border-t-emerald-500",
    bg: "bg-emerald-600/10",
    bgStrong: "bg-emerald-600/20",
    gradient: "from-gray-900/40 to-emerald-900/10",
    cardBorder: "border-emerald-900/30",
  },
} as const;

export const TASK_DETAILS_THEME = {
  container: "bg-[#0a0a0a] text-white shadow-2xl border border-white/10",
  header: {
    icon: CheckSquare,
    color: "text-blue-400",
  },
  label: "text-[10px] uppercase font-black text-gray-500 tracking-widest",
  input:
    "bg-black/40 border-gray-800 focus:border-blue-500/50 focus:ring-0 text-white disabled:opacity-50 transition-all",
  buttons: {
    edit: "bg-blue-600/10 text-blue-400 border border-blue-500/30 hover:bg-blue-600/20",
    save: "bg-blue-600 text-white hover:bg-blue-700 shadow-[0_0_15px_rgba(37,99,235,0.3)]",
    delete: "text-red-500 hover:bg-red-500/10 hover:text-red-400",
    cancel: "text-gray-400 hover:text-white",
  },
} as const;

// Temas para el módulo de Directorio de Usuarios
export const DIRECTORY_THEME = {
  container:
    "bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden flex flex-col h-full",
  table: {
    header:
      "bg-gray-950/50 text-gray-400 text-xs uppercase tracking-wider border-b border-gray-800",
    row: "hover:bg-white/[0.02] transition-colors group border-b border-gray-800/50",
    textPrimary: "text-sm font-bold text-white leading-none",
    textSecondary: "text-[11px] text-gray-500 mt-1",
  },
  roles: {
    USER: {
      label: "Usuario",
      bg: "bg-cyan-500/10",
      text: "text-cyan-400",
      border: "border-cyan-500/20",
    },
    ADMIN: {
      label: "Administrador",
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      border: "border-purple-500/20",
    },
  },
  pagination: {
    wrapper: "p-4 border-t border-gray-800 bg-gray-950/30",
    active: "bg-cyan-600 text-white hover:bg-cyan-700",
    inactive: "text-gray-400 hover:bg-gray-800 hover:text-white",
  },
} as const;
