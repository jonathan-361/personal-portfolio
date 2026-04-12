import {
  FileText,
  StickyNote,
  GraduationCap,
  Briefcase,
  Star,
  Trophy,
  CheckSquare,
} from "lucide-react";

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
