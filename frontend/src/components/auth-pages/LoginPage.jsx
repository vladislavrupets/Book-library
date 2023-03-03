import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import "./authPages.css";
import { selectAuth, login } from "../../store/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [Login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(login({ login: Login, password }))
      .unwrap()
      .then((res) => {
        navigate("/main");
      })
      .catch((err) => {
        setError(err.error);
      });
  };

  return (
    <form className="auth-container" onSubmit={handleSubmit}>
      <h2 className="auth-header">Login</h2>
      <span className="auth-error">{error}</span>
      <input
        className={Login ? "auth-input valid" : "auth-input"}
        type="text"
        placeholder="Login"
        value={Login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        className={password ? "auth-input valid" : "auth-input"}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        disabled={!(Login && password)}
        className={Login && password ? "submit-btn active" : "submit-btn"}
      >
        Log in
      </button>
      <span className="auth-link" onClick={() => navigate("/register")}>
        Don't have an account?
      </span>
    </form>
  );
};

export default LoginPage;
