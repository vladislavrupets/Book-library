import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "../components/auth-pages/LoginPage";
import RegisterPage from "../components/auth-pages/RegisterPage";
import MainPage from "../components/main-page/MainPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/*" element={<MainPage />} />
  </Routes>
);

export default AppRoutes;
