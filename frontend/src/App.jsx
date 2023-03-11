import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import MainPage from "./components/main-page/MainPage";
import LoginPage from "./components/auth-pages/LoginPage";
import RegisterPage from "./components/auth-pages/RegisterPage";
import { fetchUser } from "./store/authSlice";

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
