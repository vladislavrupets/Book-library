import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import LoginPage from "./components/auth-pages/LoginPage";
import RegisterPage from "./components/auth-pages/RegisterPage";
import MainPage from "./components/main-page/MainPage";
import DashBooks from "./components/main-page/dashboard-components/dash-bodies/DashBooks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/test" element={<DashBooks />} />
        <Route path="/*" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
