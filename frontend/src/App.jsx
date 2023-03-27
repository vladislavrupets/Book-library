import React from "react";
import { BrowserRouter} from "react-router-dom";

import "./App.css";
import GlobalStyle from "./GlobalStyle";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
