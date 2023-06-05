import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../utilities/axiosConfig";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await Axios.get("/books");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addBook = createAsyncThunk(
  "books/addBook",
  async (book, { rejectWithValue }) => {
    try {
      const res = await Axios.post("/books/add-book", { book });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const editBook = createAsyncThunk(
  "books/editBook",
  async (book, { rejectWithValue }) => {
    try {
      const res = await Axios.put(`/books/${book.id}`, { book });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "resolved";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(addBook.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.status = "resolved";
        state.books.push(action.payload);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.error;
      })
      .addCase(editBook.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editBook.fulfilled, (state, action) => {
        state.status = "resolved";
        const { id, ...updatedBook } = action.payload;
        const index = state.books.findIndex((book) => book.id === id);
        if (index !== -1) {
          state.books[index] = { ...state.books[index], ...updatedBook };
        }
      })
      .addCase(editBook.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.error;
      });
  },
});

export const {} = booksSlice.actions;

export default booksSlice.reducer;
