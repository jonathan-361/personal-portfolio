import { Routes, Route, Navigate } from "react-router";
import paths from "./paths/path";

import LoginPage from "../../auth/section/login/LoginPage";
import RegisterPage from "@/modules/auth/section/register/RegisterPage";

import ChangePassword from "@/modules/auth/section/change-password/ChangePassword";
import HomePage from "@/modules/home/pages/HomePage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path={paths.test} element={<Navigate to={paths.login} />} />
      <Route path={paths.login} element={<LoginPage />} />
      <Route path={paths.register} element={<RegisterPage />} />
      <Route path={paths.changePassword} element={<ChangePassword />} />
      <Route path={paths.home} element={<HomePage />} />
    </Routes>
  );
}
