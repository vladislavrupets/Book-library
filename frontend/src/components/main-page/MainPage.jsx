import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import NaviBar from "./navibar/NaviBar";
import Body from "./body/Body";
import Sidebar from "./sidebar/Sidebar";
import { fetchUser } from "../../store/authSlice";

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <>
      <NaviBar />
      <Body />
      <Sidebar />
    </>
  );
};

export default MainPage;
