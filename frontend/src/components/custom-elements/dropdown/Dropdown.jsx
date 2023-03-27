import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { KeyboardArrowDown } from "@mui/icons-material";

import "./dropdown.css";
import "../../../styles.css";

const Dropdown = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown-container">
      <div className="dropdown__btn" onClick={() => setIsOpen(!isOpen)}>
        <span className="dropdown__title">{title}</span>
        <KeyboardArrowDown sx={{ color: "#007aff" }} />
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
