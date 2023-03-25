import React, { useState, useEffect } from "react";
import { useNavigate, BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./mainPage.css";
import NaviBar from "./navibar/NaviBar";
import MainBody from "./main-body/MainBody";
import DashSidebar from "./dashboard-components/dash-sidebar/DashSidebar";
import DashBooks from "./dashboard-components/dash-bodies/DashBooks";
import DashUsers from "./dashboard-components/dash-bodies/DashUsers";
import { fetchUser } from "../../store/authSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <div className="main-container">
      <header className="main-container__header">
        <NaviBar />
      </header>
      <div className="inner-container">
        {user?.category === "administrator" && "librarian" ? (
          <aside className="inner-container__aside">
            <DashSidebar />
          </aside>
        ) : null}

        <main
          className={
            user?.category === "administrator" && "librarian"
              ? "inner-container__content with-aside"
              : "inner-container__content"
          }
        >
          <Routes>
            <Route path="/" element={<MainBody />} />
            <Route path="/dashboard/books" element={<DashBooks />} />
            <Route path="/dashboard/users" element={<DashUsers />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default MainPage;
