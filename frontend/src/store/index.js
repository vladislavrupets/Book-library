import { configureStore } from "@reduxjs/toolkit";

import authReduser from "./authSlice";
import bookReduser from "./bookSlice";

const store = configureStore({
  reducer: {
    auth: authReduser,
    book: bookReduser,
  },
});

export default store;
