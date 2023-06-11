import React from "react";
import { Routes, Route } from "react-router-dom";

import MainBody from "../components/main-page/main-body/MainBody";
import ProfilePage from "../components/profile-page/ProfilePage";
import BookBorrowingsPage from "../components/BookBorrowingsPage";

const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<MainBody />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/borrowings" element={<BookBorrowingsPage />} />
  </Routes>
);

export default MainRoutes;
