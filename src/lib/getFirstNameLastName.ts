import type { User } from "@/modules/home/models/user.model";

export const getFirstNameLastName = (user: User | null | undefined): string => {
  if (!user) return "";

  const firstName = user.names?.trim().split(" ")[0] || "";
  const firstLastName = user.first_last_name?.trim().split(" ")[0] || "";

  return `${firstName} ${firstLastName}`.trim();
};
