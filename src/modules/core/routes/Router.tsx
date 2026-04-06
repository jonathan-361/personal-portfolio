import { Routes, Route, Navigate } from "react-router";
import paths from "./paths/path";
import { ProtectedRoute } from "./ProtectedRoute";

import LoginPage from "../../auth/section/login/LoginPage";
import RegisterPage from "@/modules/auth/section/register/RegisterPage";
import { Error400 } from "@/modules/auth/section/errors/error400";
import { Error401 } from "@/modules/auth/section/errors/error401";
import { Error403 } from "@/modules/auth/section/errors/error403";
import { Error404 } from "@/modules/auth/section/errors/error404";
import { Error405 } from "@/modules/auth/section/errors/error405";
import { Error500 } from "@/modules/auth/section/errors/error500";
import { Error501 } from "@/modules/auth/section/errors/error501";
import { Error502 } from "@/modules/auth/section/errors/error502";
import { Error503 } from "@/modules/auth/section/errors/error503";



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
<<<<<<< HEAD
      <Route path={paths.error400} element={<Error400 />} />
      <Route path={paths.error401} element={<Error401 />} />
      <Route path={paths.error403} element={<Error403 />} />
      <Route path={paths.error404} element={<Error404 />} />
      <Route path={paths.error405} element={<Error405 />} />
      <Route path={paths.error500} element={<Error500 />} />
      <Route path={paths.error501} element={<Error501 />} />
      <Route path={paths.error502} element={<Error502 />} />
      <Route path={paths.error503} element={<Error503 />} />
=======
      <Route path={paths.changePassword} element={<ChangePassword />} />

      {/*Rutas privadas*/}
      <Route element={<ProtectedRoute />}>
        <Route path={paths.home} element={<HomePage />} />
      </Route>
>>>>>>> 1c63bba4a1bf91dd72bd2f1e2cad474037f51b62
    </Routes>
  );
}
