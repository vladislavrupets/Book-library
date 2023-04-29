import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./mainPage.css";
import MainRoutes from "../../routes/MainRoutes";
import NaviBar from "./navibar/NaviBar";
import DashSidebar from "../dashboard-components/dash-sidebar/DashSidebar";
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
              ? "inner-container__content-with-aside"
              : ""
          }
        >
          <MainRoutes />
        </main>
      </div>
    </div>
  );
};

export default MainPage;
