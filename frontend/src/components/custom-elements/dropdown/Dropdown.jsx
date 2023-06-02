import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { KeyboardArrowRight } from "@mui/icons-material";

import "./dropdown.css";

const Dropdown = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown-container">
      <div
        className={`dropdown__btn ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="dropdown__title">{title}</span>
        <div className={`dropdown__icon-wrapper ${isOpen ? "open" : ""}`}>
          <KeyboardArrowRight sx={{ color: "#007aff" }} />
        </div>
      </div>
      <div className={`dropdown ${isOpen ? "open" : ""}`}>
        {options.map((option, index) => (
          <NavLink
            key={index}
            to={option.link}
            className={({ isActive }) =>
              isActive ? "link active" : "link inactive"
            }
          >
            {option.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
