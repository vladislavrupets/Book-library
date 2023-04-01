import React from "react";

import "./input.css";

const Input = ({ label, ...props }) => {
  return (
    <div className="input-container">
      <input className="input-field" {...props} required />
      <span className="input-label">{label}</span>
    </div>
  );
};

export default Input;
