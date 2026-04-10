import { useState } from "react";
import { SectionLayout } from "@/components/custom/SectionLayout";
import { Plus } from "lucide-react";
import { userMock } from "@/modules/core/data/dashboard.data";

import type { User } from "@/modules/core/data/dashboard.types";

export default function AchievementsPage() {
  const [user] = useState<User>(userMock);

  return (
    <SectionLayout
      user={user}
      title="Logros"
      subtitle="Gestión de logros personales, empresariales o académicos"
      buttonLabel="Nuevo logro"
      onButtonClick={() => console.log("Nuevo logro")}
    >
      <div className="max-w-4xl mx-auto">
        {/* Aquí iría tu lista de logros */}
        <div className="border-2 border-dashed border-gray-800 rounded-2xl h-60 flex flex-col items-center justify-center gap-4 text-center p-6 bg-gray-900/20 mt-4">
          <div className="p-4 rounded-full bg-gray-900 border border-gray-800 text-gray-600">
            <Plus className="w-8 h-8" />
          </div>
          <p className="text-gray-400 font-semibold">No hay logros aún</p>
        </div>
      </div>
    </SectionLayout>
  );
}
