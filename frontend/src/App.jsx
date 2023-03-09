import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import MainPage from "./components/main-page/MainPage";
import LoginPage from "./components/auth-pages/LoginPage";
import RegisterPage from "./components/auth-pages/RegisterPage";
import { fetchUser } from "./store/authSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  //is the user logged in?
  // useEffect(() => {
  //   dispatch(fetchUser()).catch((err) => {
  //     console.error(err);
  //   });
  // }, []);
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
