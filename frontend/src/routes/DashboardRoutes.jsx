import React from "react";
import { Routes, Route } from "react-router-dom";

import BookList from "../components/dashboard-features/books/BookList";
import AddBook from "../components/dashboard-features/books/AddBook";
import EditBook from "../components/dashboard-features/books/EditBook";
import BorrowingRequests from "../components/dashboard-features/borrowings/BorrowingRequests";
import ActiveBorrowings from "../components/dashboard-features/borrowings/ActiveBorrowings";
import UserList from "../components/dashboard-features/users/UserList";

const DashboardRoutes = () => (
  <Routes>
    <Route path="/dashboard/books/book-list" element={<BookList />} />
    <Route path="/dashboard/books/edit-book/:bookId" element={<EditBook />} />
    <Route path="/dashboard/books/add-book" element={<AddBook />} />
    <Route path="/dashboard/users/users-list" element={<UserList />} />
    <Route
      path="/dashboard/borrowings/borrowing-requests"
      element={<BorrowingRequests />}
    />
    <Route
      path="/dashboard/borrowings/active-borrowings"
      element={<ActiveBorrowings />}
    />
    <Route path="/dashboard/users/user-list" element={<UserList />} />
  </Routes>
);

export default DashboardRoutes;
