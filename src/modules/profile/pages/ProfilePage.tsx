import { useEffect, useState } from "react";
import { SectionLayout } from "@/components/custom/SectionLayout";
import { useUserStore } from "@/modules/core/store/user.store";
import { userService } from "@/modules/core/services/user-services/user.services";
import { ProfileCard } from "@/modules/profile/components/ProfileCard";
import { EditProfileForm } from "@/modules/profile/components/EditProfileForm";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { user, setUser } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    const fetchUpdatedProfile = async () => {
      try {
        const freshUser = await userService.getMe();
        setUser(freshUser);
      } catch (error) {
        console.error("Error al sincronizar el perfil:", error);
      } finally {
        setIsSyncing(false);
      }
    };
    fetchUpdatedProfile();
  }, [setUser]);
  if (!user && isSyncing) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <SectionLayout
      user={user}
      title="Configuración de Perfil"
      subtitle={
        isEditing
          ? "Modifica tus datos personales."
          : "Visualiza y gestiona tu identidad en la plataforma."
      }
      showButton={false}
    >
      <div className="max-w-4xl mx-auto py-4">
        <AnimatePresence mode="wait">
          {!isEditing ? (
            <motion.div
              key="view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ProfileCard user={user} onEditClick={() => setIsEditing(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="edit"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <EditProfileForm onCancel={() => setIsEditing(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionLayout>
  );
}
