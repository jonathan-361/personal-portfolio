import type { User } from "@/modules/home/models/user.model";

export function getInitials(user: User | null | undefined): string {
  if (!user) return "??";

  const firstInitial = user.names?.[0] || "";
  const lastInitial = user.first_last_name?.[0] || "";

  const initials = `${firstInitial}${lastInitial}`.toUpperCase();
  return initials || user.email?.[0].toUpperCase() || "U";
}
