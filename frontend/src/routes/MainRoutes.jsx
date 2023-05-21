import React from "react";
import { Routes, Route } from "react-router-dom";

import MainBody from "../components/main-page/main-body/MainBody";
import ProfilePage from "../components/profile-page/ProfilePage";
import AddBook from "../components/dashboard-components/dash-features/Books/add-book/AddBook";
import AddUser from "../components/dashboard-components/dash-features/Users/AddUser";

const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<MainBody />} />
    <Route path="profile" element={<ProfilePage />} />
    <Route path="/dashboard/books/add-book" element={<AddBook />} />
    <Route path="/dashboard/users/add-user" element={<AddUser />} />
  </Routes>
);

export default MainRoutes;
