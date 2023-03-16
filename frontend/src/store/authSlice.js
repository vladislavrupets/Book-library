import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import Axios from "../utilities/axiosConfig";

export const register = createAsyncThunk(
  "auth/register",
  async (user, { rejectWithValue }) => {
    try {
      const res = await Axios.post("/auth/register", { user });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const res = await Axios.post("/auth/login", { user });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await Axios.post("/auth/logout");
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetch-user",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Axios.get("/auth/fetch-user");
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    //register
    [register.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [register.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload.error;
    },

    //login
    [login.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [login.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },

    //logout
    [logout.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [logout.fulfilled]: (state) => {
      state.status = "resolved";
      state.user = null;
    },
    [logout.rejected]: (state, action) => {
      state.status = "rejected";
      state.user = null;
      state.error = action.payload;
    },

    //fetchUser
    [fetchUser.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.user = action.payload;
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
