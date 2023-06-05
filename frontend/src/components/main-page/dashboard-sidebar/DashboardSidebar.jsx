import React from "react";
import { useNavigate, NavLink } from "react-router-dom";

import "./dashboardSidebar.css";
import DropdownSelect from "../../custom-elements/dropdown-select/DropdownSelect";

const dropdownOptions = {
  booksOptions: [
    {
      title: "Book list",
      link: "/dashboard/books/book-list",
    },
    {
      title: "Edit book",
      link: "/dashboard/books/edit-book",
    },
    {
      title: "Add book",
      link: "/dashboard/books/add-book",
    },
  ],

  usersOptions: [
    {
      title: "User list",
      link: "/dashboard/users/users-list",
    },
    {
      title: "Users stats",
      link: "/dashboard/users/users-stats",
    },
    {
      title: "Add new user",
      link: "/dashboard/users/add-user",
    },
    {
      title: "Borrowing requests",
      link: "/dashboard/users/borrowings",
    },
  ],
};

const DashboardSidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="dash-sidebar">
      <DropdownSelect title={"Books"} options={dropdownOptions.booksOptions} />
      <DropdownSelect title={"Users"} options={dropdownOptions.usersOptions} />
    </div>
  );
};

export default DashboardSidebar;
