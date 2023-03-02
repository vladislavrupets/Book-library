import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./authPages.css";
import { login } from "../../store/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const [log, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ login, password }));
    navigate("/main");
  };

  return (
    <form className="auth-container" onSubmit={handleSubmit}>
      <h2 className="auth-header">Login</h2>
      <span className="auth-error">{error}</span>
      <input
        className={log ? "auth-input valid" : "auth-input"}
        type="text"
        placeholder="Login"
        value={log}
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
        disabled={!(log && password)}
        className={log && password ? "submit-btn active" : "submit-btn"}
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
