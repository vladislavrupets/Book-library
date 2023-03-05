import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../utilities/axiosConfig";

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await axios.post("/user/register", userData);
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await axios.post("/user/login", userData);
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const data = await axios.post("/user/logout");
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetch-user",
  async (_, { rejectWithValue }) => {
    try {
      const data = await axios.get("/user/fetch-user");
      return data.user;
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
      state.error = action.payload.error;
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
      state.error = action.payload.error;
    },
  },
});

export default authSlice.reducer;
