import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./mainPage.css";
import NaviBar from "./navibar/NaviBar";
import Body from "./body/Body";
import DashSidebar from "./dashboaed-components/dash-sidebar/DashSidebar";
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

        <main className="inner-container__content">
          <Body />
        </main>
      </div>
    </div>
  );
};

export default MainPage;
