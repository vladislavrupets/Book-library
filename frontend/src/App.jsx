import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import LoginPage from "./components/auth-pages/LoginPage";
import RegisterPage from "./components/auth-pages/RegisterPage";
import MainPage from "./components/main-page/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route index element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
