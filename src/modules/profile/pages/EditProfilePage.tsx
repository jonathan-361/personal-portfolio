import { SectionLayout } from "@/components/custom/SectionLayout";
import { EditProfileForm } from "@/modules/profile/components/EditProfileForm";
import { useUserStore } from "@/modules/core/store/user.store";
import { useNavigate } from "react-router";
import paths from "@/modules/core/routes/paths/path";

export default function EditProfilePage() {
  const { user } = useUserStore();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <SectionLayout
      user={user}
      title="Editar Perfil"
      subtitle="Actualiza tu información personal y de contacto."
      showButton={false}
    >
      <div className="max-w-4xl mx-auto py-4">
        <EditProfileForm onCancel={() => navigate(paths.profile)} />
      </div>
    </SectionLayout>
  );
}
