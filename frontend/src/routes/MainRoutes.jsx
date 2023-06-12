import React from "react";
import { Routes, Route } from "react-router-dom";

import MainBody from "../components/main-page/main-body/MainBody";
import ProfilePage from "../components/profile-page/ProfilePage";
import BorrowingsListPage from "../components/BorrowingsListPage";
import BookBorrowingPage from "../components/main-page/book-borrowing-page/BookBorrowingPage";

const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<MainBody />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/book-borrowing/:bookId" element={<BookBorrowingPage />} />
    <Route path="/borrowings-list" element={<BorrowingsListPage />} />
  </Routes>
);

export default MainRoutes;
