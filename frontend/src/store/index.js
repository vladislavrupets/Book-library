import { configureStore } from "@reduxjs/toolkit";

import authReduser from "./authSlice";

export default configureStore({
  reducer: {
    auth: authReduser,
  },
});
