import { configureStore } from "@reduxjs/toolkit";

import authReduser from "./authSlice";
import bookReduser from "./bookSlice";
import borrowingReduser from "./borrowingSlice";

const store = configureStore({
  reducer: {
    auth: authReduser,
    book: bookReduser,
    borrowing: borrowingReduser,
  },
});

export default store;
