import { configureStore } from "@reduxjs/toolkit";

import authReduser from "./authSlice";
import bookReduser from "./bookSlice";
import borrowingReduser from "./borrowingSlice";
import userReduser from "./userSlice";

const store = configureStore({
  reducer: {
    auth: authReduser,
    book: bookReduser,
    borrowing: borrowingReduser,
    user: userReduser,
  },
});

export default store;
