import { formatDate, formatRelativeTime } from "@/lib/formatters";

export function formatMemberSince(dateString: string): string {
  if (!dateString) return "No disponible";

  const absolute = formatDate(dateString);
  const relative = formatRelativeTime(dateString);

  return `${absolute} (${relative})`;
}
