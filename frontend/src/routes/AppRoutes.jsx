import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "../components/auth-pages/LoginPage";
import RegisterPage from "../components/auth-pages/RegisterPage";
import Container from "../components/main-page/Container";

const AppRoutes = () => (
  <Routes>
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/*" element={<Container />} />
  </Routes>
);

export default AppRoutes;
