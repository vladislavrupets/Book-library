import React from "react";

import "./input.css";

const Input = ({ label, ...props }) => {
  return (
    <div className="input-container">
      <input className="input-field" name="input" required {...props} />
      <label className="input-label" for="input">
        {label}
      </label>
    </div>
  );
};

export default Input;
