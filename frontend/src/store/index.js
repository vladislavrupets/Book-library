import { configureStore } from "@reduxjs/toolkit";

import authReduser from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authReduser,
  },
});

export default store;
