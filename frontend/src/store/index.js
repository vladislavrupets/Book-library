import { configureStore } from "@reduxjs/toolkit";

import authReduser from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReduser,
  },
});
