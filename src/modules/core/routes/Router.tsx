import { Routes, Route, Navigate } from "react-router";
import paths from "./paths/path";

import Login from "../../auth/section/login/LoginPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path={paths.test} element={<Navigate to={paths.login} />} />
      <Route path={paths.login} element={<Login />} />
    </Routes>
  );
}
