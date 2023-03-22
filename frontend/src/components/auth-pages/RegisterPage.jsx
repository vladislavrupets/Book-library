import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./authPages.css";
import { register } from "../../store/authSlice";

const NAME_REGEX = /^[A-Z][a-z]*$/;
const PHONE_REGEX = /^\+380\d{9}$/;
const LOGIN_REGEX = /^[a-zA-Z0-9_-]{3,15}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const INPUT_RULES = {
  fullName: "Format: Surname Name Patronymic (optional)",
  phoneNumber: "Format: +380XXXXXXXXX",
  login: "Must be from 3 to 15 characters",
  password:
    "Must be 8 characters long. and contain at least one lowercase and uppercase letter and a number",
  confirmPass: "Passwords must match",
};

const RegisterPage = () => {
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [patronymic, setPatronymic] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fullName = `${surname} ${name} ${patronymic}`;
    console.log(fullName);
    try {
      await dispatch(
        register({ fullName, phoneNumber, login, password })
      ).unwrap();
      navigate("/");
    } catch (err) {
      setError(err.error);
    }
  };

  return (
    <form className="auth-container" onSubmit={handleSubmit}>
      <h2 className="auth-header">Registration</h2>
      <span className="auth-error">{error}</span>
      <input
        className={NAME_REGEX.test(surname) ? "auth-input valid" : "auth-input"}
        type="text"
        placeholder="Surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />
      <input
        className={NAME_REGEX.test(name) ? "auth-input valid" : "auth-input"}
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className={
          NAME_REGEX.test(patronymic) || !patronymic
            ? "auth-input valid"
            : "auth-input"
        }
        type="text"
        placeholder="Patronymic (optional)"
        value={patronymic}
        onChange={(e) => setPatronymic(e.target.value)}
      />

      <input
        className={
          PHONE_REGEX.test(phoneNumber) ? "auth-input valid" : "auth-input"
        }
        type="tel"
        placeholder="Phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <span
        className={
          PHONE_REGEX.test(phoneNumber)
            ? "auth-input-rule valid"
            : "auth-input-rule"
        }
      >
        {INPUT_RULES.phoneNumber}
      </span>

      <input
        className={LOGIN_REGEX.test(login) ? "auth-input valid" : "auth-input"}
        type="text"
        placeholder="Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <span
        className={
          LOGIN_REGEX.test(login) ? "auth-input-rule valid" : "auth-input-rule"
        }
      >
        {INPUT_RULES.login}
      </span>

      <input
        className={
          PASSWORD_REGEX.test(password) ? "auth-input valid" : "auth-input"
        }
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <span
        className={
          PASSWORD_REGEX.test(password)
            ? "auth-input-rule valid"
            : "auth-input-rule"
        }
      >
        {INPUT_RULES.password}
      </span>

      <input
        className={
          confirmPass !== "" && confirmPass === password
            ? "auth-input valid"
            : "auth-input"
        }
        type="password"
        placeholder="Confirm password"
        value={confirmPass}
        onChange={(e) => setConfirmPass(e.target.value)}
      />
      <span
        className={
          confirmPass !== "" && confirmPass === password
            ? "auth-input-rule valid"
            : "auth-input-rule"
        }
      >
        {INPUT_RULES.confirmPass}
      </span>

      <button
        disabled={
          !(
            NAME_REGEX.test(name) &&
            NAME_REGEX.test(surname) &&
            (NAME_REGEX.test(patronymic) || !patronymic) &&
            PHONE_REGEX.test(phoneNumber) &&
            LOGIN_REGEX.test(login) &&
            PASSWORD_REGEX.test(password) &&
            confirmPass !== "" &&
            confirmPass === password
          )
        }
      >
        Register
      </button>
      <span className="auth-link" onClick={() => navigate("/login")}>
        Already have an account?
      </span>
    </form>
  );
};

export default RegisterPage;
