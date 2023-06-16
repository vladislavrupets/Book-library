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

export const approveBorrowing = createAsyncThunk(
  "borrowings/approveBorrowing",
  async (borrowingId, { rejectWithValue }) => {
    try {
      const response = await Axios.post("/borrowings/approve-borrowing", {
        borrowingId,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const approveReturn = createAsyncThunk(
  "borrowings/approveReturn",
  async ({ borrowingId, actualEndDate }, { rejectWithValue }) => {
    try {
      const response = await Axios.post("/borrowings/return-book", {
        borrowingId,
        actualEndDate,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const rejectBorrowing = createAsyncThunk(
  "borrowings/rejectBorrowing",
  async (borrowingId, { rejectWithValue }) => {
    console.log(borrowingId);
    try {
      const response = await Axios.post("/borrowings/reject-borrowing", {
        borrowingId,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBorrowingRequests = createAsyncThunk(
  "borrowings/getBorrowingRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get("/borrowings/get-borrowing-requests");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getActiveBorrowings = createAsyncThunk(
  "borrowings/getActiveBorrowings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get("/borrowings/get-active-borrowings");
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
    borrowingsCount: 0,
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
      })

      .addCase(getBorrowingRequests.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getBorrowingRequests.fulfilled, (state, action) => {
        state.status = "resolved";
        state.borrowings = action.payload.borrowings;
        state.borrowingsCount = action.payload.borrowingsCount;
      })
      .addCase(getBorrowingRequests.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })

      .addCase(getActiveBorrowings.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getActiveBorrowings.fulfilled, (state, action) => {
        state.status = "resolved";
        state.borrowings = action.payload.borrowings;
        state.borrowingsCount = action.payload.borrowingsCount;
      })
      .addCase(getActiveBorrowings.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })

      .addCase(approveBorrowing.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(approveBorrowing.fulfilled, (state, action) => {
        state.status = "resolved";
        state.borrowings = state.borrowings.filter(
          (borrowing) => borrowing.id !== action.payload.id
        );
      })
      .addCase(approveBorrowing.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })

      .addCase(approveReturn.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(approveReturn.fulfilled, (state, action) => {
        state.status = "resolved";
        state.borrowings = state.borrowings.filter(
          (borrowing) => borrowing.id !== action.payload.id
        );
      })
      .addCase(approveReturn.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const {} = borrowingSlice.actions;

export default borrowingSlice.reducer;
