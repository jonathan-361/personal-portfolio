import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import paths from "@/modules/core/routes/paths/path";
import { ProtectedRoute } from "@/modules/core/routes/ProtectedRoute";
import { PublicRoute } from "@/modules/core/routes/PublicRoute";
import { useErrorStore } from "@/modules/core/store/error.store";
import { ErrorSwitcher } from "@/components/custom/ErrorSwitcher";

import LoginPage from "@/modules/auth/section/login/LoginPage";
import RegisterPage from "@/modules/auth/section/register/RegisterPage";
import ChangePassword from "@/modules/auth/section/change-password/ChangePassword";

import HomePage from "@/modules/home/pages/HomePage";
import NotesPage from "@/modules/notes/pages/NotesPage";
import TasksPage from "@/modules/tasks/pages/TasksPage";
import AchievementsPage from "@/modules/achievements/pages/AchievementsPage";
import ExperiencesPage from "@/modules/experiences/pages/ExperiencesPage";
import ProfilePage from "@/modules/profile/pages/ProfilePage";
import EditProfilePage from "@/modules/profile/pages/EditProfilePage";

import { AdminDashboardPage } from "@/modules/admin/sections/home/pages/AdminDashboardPage";
import { AdminDirectoryPage } from "@/modules/admin/sections/directory/pages/AdminDirectoryPage";
import AdminViewUserPage from "@/modules/admin/sections/directory/pages/AdminViewUserPage";
import NoteSection from "@/modules/admin/sections/directory/pages/NoteSection";
import AchievementSection from "@/modules/admin/sections/directory/pages/AchievementSection";

import Error400 from "@/components/custom/errors/error400";

export default function AppRouter() {
  const statusCode = useErrorStore((state) => state.statusCode);

  if (statusCode) {
    return <ErrorSwitcher />;
  }

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path={paths.main} element={<Navigate to={paths.login} />} />
        <Route path={paths.test2} element={<Error400 />} />
        <Route path={paths.login} element={<LoginPage />} />
        <Route path={paths.register} element={<RegisterPage />} />
        <Route path={paths.changePassword} element={<ChangePassword />} />
      </Route>

      {/*Rutas privadas estudiante*/}
      <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
        <Route path={paths.home} element={<HomePage />} />
        <Route path={paths.notes} element={<NotesPage />} />
        <Route path={paths.tasks} element={<TasksPage />} />
        <Route path={paths.achievement} element={<AchievementsPage />} />
        <Route path={paths.experiences} element={<ExperiencesPage />} />
      </Route>

      {/* Rutas privadas admin */}
      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route path={paths.adminHome} element={<AdminDashboardPage />} />
        <Route path={paths.adminDirectory} element={<AdminDirectoryPage />} />
        <Route path={paths.adminViewUser} element={<AdminViewUserPage />} />
        <Route path={paths.adminUserNotes} element={<NoteSection />} />
        <Route path={paths.adminUserTasks} element={<TasksPage />} />
        <Route
          path={paths.adminUserAchievements}
          element={<AchievementSection />}
        />
        <Route
          path={paths.adminUserExperiences}
          element={<ExperiencesPage />}
        />
      </Route>

      {/* Ruta privada de perfil */}
      <Route element={<ProtectedRoute allowedRoles={["USER", "ADMIN"]} />}>
        <Route path={paths.profile} element={<ProfilePage />} />
        <Route path={paths.editProfile} element={<EditProfilePage />} />
      </Route>

      <Route path="*" element={<Error404Trigger />} />
      <Route path="*" element={<Error404Trigger />} />
    </Routes>
  );
}

const Error404Trigger = () => {
  const setErrorCode = useErrorStore((state) => state.setErrorCode);

  useEffect(() => {
    setErrorCode(404);
  }, [setErrorCode]);

  return null;
};
