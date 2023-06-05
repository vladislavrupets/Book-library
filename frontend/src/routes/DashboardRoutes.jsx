import React from "react";
import { Routes, Route } from "react-router-dom";

import BookList from "../components/dashboard-features/books/BookList";
import AddBook from "../components/dashboard-features/books/AddBook";
import EditBook from "../components/dashboard-features/books/EditBook";
import AddUser from "../components/dashboard-features/users/add-user/AddUser";

const DashboardRoutes = () => (
  <Routes>
    <Route path="/dashboard/books/book-list" element={<BookList />} />
    <Route path="/dashboard/books/edit-book" element={<EditBook />} />
    <Route path="/dashboard/books/add-book" element={<AddBook />} />

    <Route path="/dashboard/users/add-user" element={<AddUser />} />
  </Routes>
);

export default DashboardRoutes;
