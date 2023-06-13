import React from "react";
import { Routes, Route } from "react-router-dom";

import BookList from "../components/dashboard-features/books/BookList";
import AddBook from "../components/dashboard-features/books/AddBook";
import EditBook from "../components/dashboard-features/books/EditBook";
import AddUser from "../components/dashboard-features/users/AddUser";
import BorrowingRequests from "../components/dashboard-features/borrowings/BorrowingRequests";
import ActiveBorrowings from "../components/dashboard-features/borrowings/ActiveBorrowings";

const DashboardRoutes = () => (
  <Routes>
    <Route path="/dashboard/books/book-list" element={<BookList />} />
    <Route path="/dashboard/books/edit-book/:bookId" element={<EditBook />} />
    <Route path="/dashboard/books/add-book" element={<AddBook />} />
    <Route path="/dashboard/users/add-user" element={<AddUser />} />
    <Route
      path="/dashboard/borrowings/borrowing-requests"
      element={<BorrowingRequests />}
    />
    <Route
      path="/dashboard/borrowings/active-borrowings"
      element={<ActiveBorrowings />}
    />
  </Routes>
);

export default DashboardRoutes;
