import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../utilities/axiosConfig";

export const getUserBorrowingsbyLogin = createAsyncThunk(
  "users/getUsersBorrowingsbyLogin",
  async (login, { rejectWithValue }) => {
    try {
      const res = await Axios.get(`/users/get-borrowings-by-login/${login}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Axios.get(`/users/get-users`);
      console.log(res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    usersBorrowings: [],
    borrowingsCount: 0,
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserBorrowingsbyLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserBorrowingsbyLogin.fulfilled, (state, action) => {
        state.status = "resolved";
        state.usersBorrowings = action.payload.borrowings;
        state.borrowingsCount = action.payload.borrowingsCount;
      })
      .addCase(getUserBorrowingsbyLogin.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })

      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "resolved";
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
