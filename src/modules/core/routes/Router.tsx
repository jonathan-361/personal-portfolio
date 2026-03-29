import { Routes, Route, Navigate } from "react-router";
import paths from "./paths/path";

import Login from "../../auth/section/login/LoginPage";
import RegisterPage from "@/modules/auth/section/register/RegisterPage";
import { Error400 } from "@/modules/auth/section/errors/error400";
import { Error401 } from "@/modules/auth/section/errors/error401";
import { Error403 } from "@/modules/auth/section/errors/error403";
import { Error404 } from "@/modules/auth/section/errors/error404";
import { Error405 } from "@/modules/auth/section/errors/error405";



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
      
    </Routes>
  );
}
