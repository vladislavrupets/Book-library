import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../utilities/axiosConfig";

export const createBorrowing = createAsyncThunk(
  "borrowings/createBorrowing",
  async ({ bookId, startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await Axios.post("/borrowings/create", {
        bookId,
        startDate,
        endDate,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const borrowingSlice = createSlice({
  name: "borrowings",
  initialState: {
    borrowings: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBorrowing.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createBorrowing.fulfilled, (state, action) => {
        state.status = "resolved";
        state.borrowings.push(action.payload);
      })
      .addCase(createBorrowing.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const {} = borrowingSlice.actions;

export default borrowingSlice.reducer;
