import { Routes, Route, Navigate } from "react-router";
import paths from "./paths/path";
import { ProtectedRoute } from "./ProtectedRoute";

import LoginPage from "../../auth/section/login/LoginPage";
import RegisterPage from "@/modules/auth/section/register/RegisterPage";

import ChangePassword from "@/modules/auth/section/change-password/ChangePassword";
import HomePage from "@/modules/home/pages/HomePage";
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
      {/*Rutas públicas*/}
      <Route path={paths.test2} element={<Error404 />} />
      <Route path={paths.test} element={<Navigate to={paths.login} />} />
      <Route path={paths.login} element={<LoginPage />} />
      <Route path={paths.register} element={<RegisterPage />} />
      <Route path={paths.changePassword} element={<ChangePassword />} />

      {/*Rutas privadas*/}
      <Route element={<ProtectedRoute />}>
        <Route path={paths.home} element={<HomePage />} />
      </Route>
    </Routes>
  );
}
