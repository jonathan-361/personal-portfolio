import { Routes, Route, Navigate } from "react-router";
import paths from "./paths/path";

import Login from "../../auth/section/login/LoginPage";
import RegisterPage from "@/modules/auth/section/register/RegisterPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path={paths.test} element={<Navigate to={paths.login} />} />
      <Route path={paths.login} element={<Login />} />
      <Route path={paths.register} element={<RegisterPage />} />
    </Routes>
  );
}
