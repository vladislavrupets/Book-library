import React, { useState } from "react";
import { Close } from "@mui/icons-material";

import "./card.css";

const Card = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen && (
        <div className="card">
          <button className="close-button" onClick={() => setIsOpen(false)}>
            <Close />
          </button>
          {children}
        </div>
      )}
    </>
  );
};

export default Card;
