import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../utilities/axiosConfig";

export const getBorrowings = createAsyncThunk(
  "borrowings/getBorrowings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get("/borrowings");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

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

const borrowingsSlice = createSlice({
  name: "borrowings",
  initialState: {
    borrowings: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBorrowings.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getBorrowings.fulfilled, (state, action) => {
        state.status = "resolved";
        state.borrowings = action.payload;
      })
      .addCase(getBorrowings.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })

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

export const {} = borrowingsSlice.actions;

export default borrowingsSlice.reducer;
