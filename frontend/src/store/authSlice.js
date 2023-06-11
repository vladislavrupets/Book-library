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
    authInfo: null,
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "resolved";
        state.authInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.error;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "resolved";
        state.authInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
        console.log(action);
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "resolved";
        state.authInfo = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "rejected";
        state.authInfo = null;
        state.error = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "resolved";
        state.authInfo = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
