import { Routes, Route, Navigate } from "react-router";
import paths from "./paths/path";

import Login from "../../auth/section/login/LoginPage";
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



export default function AppRouter() {
  return (
    <Routes>
      <Route path={paths.test} element={<Navigate to={paths.login} />} />
      <Route path={paths.login} element={<Login />} />
      <Route path={paths.register} element={<RegisterPage />} />
      <Route path={paths.error400} element={<Error400 />} />
      <Route path={paths.error401} element={<Error401 />} />
      <Route path={paths.error403} element={<Error403 />} />
      <Route path={paths.error404} element={<Error404 />} />
      <Route path={paths.error405} element={<Error405 />} />
      <Route path={paths.error500} element={<Error500 />} />
      <Route path={paths.error501} element={<Error501 />} />
      <Route path={paths.error502} element={<Error502 />} />
      <Route path={paths.error503} element={<Error503 />} />
    </Routes>
  );
}
