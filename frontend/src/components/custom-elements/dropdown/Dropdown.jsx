import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { KeyboardArrowRight, Edit, QuestionMark } from "@mui/icons-material";

import "./dropdown.css";

const Dropdown = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown-container">
      {options.length > 1 ? (
        <div
          className={`dropdown__btn ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="dropdown__title">{options[0].title}</span>

          <div className={`dropdown__icon-wrapper ${isOpen ? "open" : ""}`}>
            <KeyboardArrowRight sx={{ color: "#007aff" }} />
          </div>
        </div>
      ) : (
        <span className="dropdown__title">{options[0].title}</span>
      )}
      <div className={`dropdown ${isOpen ? "open" : ""}`}>
        {options.map((option, index) => (
          <div key={index} to={option.link} className="dropdown__item ">
            <span>{option.title}</span>

            <div className="dropdown__item--options-container">
              <button className="main-button">
                <Edit fontSize="small" />
              </button>
              <button className="main-button">
                <QuestionMark fontSize="small" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
