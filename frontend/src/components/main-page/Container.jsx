import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./container.css";
import "../../styles.css";
import MainRoutes from "../../routes/MainRoutes";
import NaviBar from "./navibar/NaviBar";
import DashboardSidebar from "./dashboard-sidebar/DashboardSidebar";
import DashboardRoutes from "../../routes/DashboardRoutes";
import { fetchUser } from "../../store/authSlice";

const Container = () => {
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
            <DashboardSidebar />
          </aside>
        ) : null}

        <main
          className={
            user?.category === "administrator" && "librarian"
              ? "inner-container__content with-aside"
              : "inner-container__content"
          }
        >
          <MainRoutes />
          <DashboardRoutes />
        </main>
      </div>
    </div>
  );
};

export default Container;
