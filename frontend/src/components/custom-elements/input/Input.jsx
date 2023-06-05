import React, { forwardRef } from "react";

import "./input.css";

const Input = forwardRef(({ label, visibility, ...props }, ref) => {
  return (
    <div className={`input-container ${visibility && "visible"}`}>
      <input className="input-field" required {...props} ref={ref} />
      <label className="input-label">{label}</label>
    </div>
  );
});

export default Input;
