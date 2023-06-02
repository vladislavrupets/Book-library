import React from "react";
import { Routes, Route } from "react-router-dom";

import BookList from "../components/dashboard-features/books/book-list/BookList";
import AddBook from "../components/dashboard-features/books/add-book/AddBook";
import AddUser from "../components/dashboard-features/users/add-user/AddUser";

const DashboardRoutes = () => (
  <Routes>
    <Route path="/dashboard/books/add-book" element={<AddBook />} />
    <Route path="/dashboard/users/add-user" element={<AddUser />} />
    <Route path="/dashboard/books/book-list" element={<BookList />} />
  </Routes>
);

export default DashboardRoutes;
