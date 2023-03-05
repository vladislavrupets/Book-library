import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import MainPage from "./components/main-page/MainPage";
import LoginPage from "./components/auth-pages/LoginPage";
import RegisterPage from "./components/auth-pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} exact />
          <Route path="/register" element={<RegisterPage />} exact />
          <Route path="/login" element={<LoginPage />} exact />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
