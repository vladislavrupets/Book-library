import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../utilities/axiosConfig";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async ({ currentPage, itemsPerPage }, { rejectWithValue }) => {
    try {
      const offset = (currentPage - 1) * itemsPerPage;
      const res = await Axios.get(`/books/get-all/${offset}/${itemsPerPage}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (bookId, { rejectWithValue }) => {
    try {
      const res = await Axios.get(`/books/get-by-id/${bookId}`);
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

export const searchBooks = createAsyncThunk(
  "books/searchBooks",
  async ({ currentPage, itemsPerPage, searchData }, { rejectWithValue }) => {
    try {
      const offset = (currentPage - 1) * itemsPerPage;
      let url = `/books/search-books/${offset}/${itemsPerPage}`;

      if (searchData) {
        url += `/${searchData}`;
      }

      const res = await Axios.get(url);

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async (book, { rejectWithValue }) => {
    try {
      const res = await Axios.post(`/books/update-book`, { book });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (bookId, { rejectWithValue }) => {
    try {
      const res = await Axios.post(`/books/delete-book`, { bookId });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    booksCount: 0,
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
        state.books = action.payload.booksInfo;
        state.booksCount = action.payload.booksCount;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.books;
      })

      .addCase(fetchBookById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.status = "resolved";
        const booksArr = [];
        booksArr.push(action.payload.booksInfo);
        state.books = booksArr;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })

      .addCase(addBook.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.status = "resolved";
        state.books.push(...action.payload);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
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
      })

      .addCase(searchBooks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.status = "resolved";
        state.books = action.payload.booksInfo;
        state.booksCount = action.payload.booksCount;
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
        state.books = [];
      })

      .addCase(updateBook.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.status = "resolved";
        const { id, ...updatedBook } = action.payload;
        const index = state.books.findIndex((book) => book.id === id);
        if (index !== -1) {
          state.books[index] = { ...state.books[index], ...updatedBook };
        }
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.error;
      });
  },
});

export const {} = bookSlice.actions;

export default bookSlice.reducer;
