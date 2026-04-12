import { Routes, Route, Navigate } from "react-router";
import paths from "@/modules/core/routes/paths/path";
import { ProtectedRoute } from "@/modules/core/routes/ProtectedRoute";
import { PublicRoute } from "@/modules/core/routes/PublicRoute";

import LoginPage from "@/modules/auth/section/login/LoginPage";
import RegisterPage from "@/modules/auth/section/register/RegisterPage";
import ChangePassword from "@/modules/auth/section/change-password/ChangePassword";

import HomePage from "@/modules/home/pages/HomePage";
import NotesPage from "@/modules/notes/pages/NotesPage";
import TasksPage from "@/modules/tasks/pages/TasksPage";
import AchievementsPage from "@/modules/achievements/pages/AchievementsPage";
import ExperiencesPage from "@/modules/experiences/pages/ExperiencesPage";
import ProfilePage from "@/modules/profile/pages/ProfilePage";

import { AdminDashboardPage } from "@/modules/admin/sections/home/pages/AdminDashboardPage";
import { AdminDirectoryPage } from "@/modules/admin/sections/directory/pages/AdminDirectoryPage";

import { Error400 } from "@/components/custom/errors/error400";
import { Error401 } from "@/components/custom/errors/error401";
import { Error403 } from "@/components/custom/errors/error403";
import { Error404 } from "@/components/custom/errors/error404";
import { Error500 } from "@/components/custom/errors/error500";
import { Error501 } from "@/components/custom/errors/error501";
import { Error502 } from "@/components/custom/errors/error502";
import { Error503 } from "@/components/custom/errors/error503";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path={paths.test2} element={<Error404 />} />
        <Route path={paths.test} element={<Navigate to={paths.login} />} />
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
        <Route path={paths.profile} element={<ProfilePage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route path={paths.adminHome} element={<AdminDashboardPage />} />
        <Route path={paths.adminDirectory} element={<AdminDirectoryPage />} />
      </Route>
    </Routes>
  );
}
