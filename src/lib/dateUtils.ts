import {
  differenceInYears,
  differenceInMonths,
  differenceInWeeks,
  differenceInDays,
  addYears,
  addMonths,
  addWeeks,
} from "date-fns";

export const getPreciseTimeElapsed = (startDate: string | Date): string => {
  const start = new Date(startDate);
  const now = new Date();

  if (isNaN(start.getTime())) return "fecha inválida";

  let current = start;

  const years = differenceInYears(now, current);
  current = addYears(current, years);

  const months = differenceInMonths(now, current);
  current = addMonths(current, months);

  const weeks = differenceInWeeks(now, current);
  current = addWeeks(current, weeks);

  const days = differenceInDays(now, current);

  const parts: string[] = [];

  if (years > 0) parts.push(`${years} ${years === 1 ? "año" : "años"}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? "mes" : "meses"}`);
  if (weeks > 0) parts.push(`${weeks} ${weeks === 1 ? "semana" : "semanas"}`);
  if (days > 0) parts.push(`${days} ${days === 1 ? "día" : "días"}`);

  if (parts.length === 0) return "recién empezado";

  const significantParts = parts.slice(0, 2);

  if (significantParts.length === 1) return significantParts[0];

  const lastPart = significantParts.pop();
  return `${significantParts.join(", ")} y ${lastPart}`;
};
