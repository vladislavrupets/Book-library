import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { KeyboardArrowRight } from "@mui/icons-material";

import "./dropdownSelect.css";

const DropdownSelect = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown-select-container">
      <div
        className={`dropdown-select__btn ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="dropdown-select__title">{title}</span>
        <div
          className={`dropdown-select__icon-wrapper ${isOpen ? "open" : ""}`}
        >
          <KeyboardArrowRight sx={{ color: "#007aff" }} />
        </div>
      </div>
      <div className={`dropdown-select ${isOpen ? "open" : ""}`}>
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

export default DropdownSelect;
