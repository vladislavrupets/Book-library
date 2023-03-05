import React, { useState, useEffect } from "react";

import Header from "./header/Header";
import Body from "./body/Body";
import Sidebar from "./sidebar/Sidebar";

const MainPage = () => {
  return (
    <>
      <Header />
      <Body />
      <Sidebar />
    </>
  );
};

export default MainPage;
