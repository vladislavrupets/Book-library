import React from "react";

import "./input.css";

const Input = ({ label }) => {
  return (
    <div className="input-container">
      <input
        className="input-field"
        type="text"
        required
        autocomplete="off"
        name="name"
      />
      <label className="input-label" for="name">
        {label}
      </label>
    </div>
  );
};

export default Input;
