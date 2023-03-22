import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import DashSidebar from "./dash-sidebar/DashSidebar";
import DashBody from "../../dashboard-page/dash-body/DashBody";

const DashboardPage = () => {
  let { path } = useLocation();

  return <></>;
};

export default DashboardPage;
