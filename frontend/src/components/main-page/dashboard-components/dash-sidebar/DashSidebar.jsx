import React from "react";

import "./dashSidebar.css";

const DashSidebar = () => {
  return (
    <div className="dash-sidebar">
      <div className="dash-sidebar__items-container">
        Books
        <div className="dash-sidebar__item">Add new book</div>
      </div>
      <div className="dash-sidebar__items-container">
        Users
        <div className="dash-sidebar__item">Find user by login</div>
        <div className="dash-sidebar__item">Users stats</div>
        <div className="dash-sidebar__item">Add new user</div>
        <div className="dash-sidebar__item">Delete user</div>
        <div className="dash-sidebar__item">Borrowing requests</div>
      </div>
    </div>
  );
};

export default DashSidebar;
