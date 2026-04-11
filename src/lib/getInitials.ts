import type { User } from "@/modules/core/data/dashboard.types";

export function getInitials(user: User) {
  return `${user.first_name[0]}${user.last_name[0]}`;
}
