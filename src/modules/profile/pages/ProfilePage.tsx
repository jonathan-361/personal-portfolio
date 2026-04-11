import { useState } from "react";
import { SectionLayout } from "@/components/custom/SectionLayout";

import type { User } from "@/modules/core/data/dashboard.types";
import { userMock } from "@/modules/core/data/dashboard.data";

export default function ProfilePage() {
  const [user] = useState<User>(userMock);

  return (
    <SectionLayout user={user} title={`Perfil`} showButton={false}>
      <h1>Hola</h1>
    </SectionLayout>
  );
}
