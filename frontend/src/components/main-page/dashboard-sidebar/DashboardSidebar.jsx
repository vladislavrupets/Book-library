import React from "react";

import "./dashboardSidebar.css";
import DropdownSelect from "../../custom-elements/dropdown-select/DropdownSelect";

const dropdownOptions = {
  booksOptions: [
    {
      title: "Book list",
      link: "/dashboard/books/book-list",
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
  ],
  borrowingsOptions: [
    {
      title: "Borrowing requests",
      link: "/dashboard/borrowings/borrowing-requests",
    },
    {
      title: "Active borrowings",
      link: "/dashboard/borrowings/active-borrowings",
    },
  ],
};

const DashboardSidebar = () => {
  return (
    <div className="dash-sidebar">
      <DropdownSelect title={"Books"} options={dropdownOptions.booksOptions} />
      <DropdownSelect title={"Users"} options={dropdownOptions.usersOptions} />
      <DropdownSelect
        title={"Borrowings"}
        options={dropdownOptions.borrowingsOptions}
      />
    </div>
  );
};

export default DashboardSidebar;
