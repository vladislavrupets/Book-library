import React from "react";
import { Routes, Route } from "react-router-dom";

import MainBody from "../components/main-page/main-body/MainBody";
import ProfilePage from "../components/profile-page/ProfilePage";

const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<MainBody />} />
    <Route path="/profile" element={<ProfilePage />} />
  </Routes>
);

export default MainRoutes;
