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

// export const fetchWritings = createAsyncThunk(
//   "books/fetchWritings",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await Axios.get("/writing/get-all");
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const searchWritings = createAsyncThunk(
//   "books/searchWritings",
//   async (searchTerm, { rejectWithValue }) => {
//     try {
//       const res = await Axios.get(`/writing/search/${searchTerm}`);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const searchGenres = createAsyncThunk(
//   "books/searchGenres",
//   async (searchTerm, { rejectWithValue }) => {
//     try {
//       const res = await Axios.get(`/genre/search/${searchTerm}`);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const searchAuthors = createAsyncThunk(
//   "books/searchAuthors",
//   async (searchTerm, { rejectWithValue }) => {
//     try {
//       const res = await Axios.get(`/author/search/${searchTerm}`);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const searchPublishers = createAsyncThunk(
//   "books/searchPublishers",
//   async (searchTerm, { rejectWithValue }) => {
//     try {
//       const res = await Axios.get(`/publisher/search/${searchTerm}`);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const fetchGenres = createAsyncThunk(
//   "books/fetchGenres",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await Axios.get("/genre/get-all");
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const fetchAuthors = createAsyncThunk(
//   "books/fetchAuthors",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await Axios.get("/author/get-all");
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const fetchPublishers = createAsyncThunk(
//   "books/fetchPublishers",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await Axios.get("/publisher/get-all");
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

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
        state.books.push(...action.payload.booksInfo);
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
      });

    // .addCase(fetchWritings.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(fetchWritings.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.writings = action.payload;
    // })
    // .addCase(fetchWritings.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // })

    // .addCase(searchWritings.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(searchWritings.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.writings = action.payload;
    // })
    // .addCase(searchWritings.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // })

    // .addCase(searchGenres.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(searchGenres.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.genres = action.payload;
    // })
    // .addCase(searchGenres.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // })

    // .addCase(searchAuthors.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(searchAuthors.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.authors = action.payload;
    // })
    // .addCase(searchAuthors.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // })

    // .addCase(searchPublishers.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(searchPublishers.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.publishers = action.payload;
    // })
    // .addCase(searchPublishers.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // })

    // .addCase(fetchGenres.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(fetchGenres.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.genres = action.payload;
    // })
    // .addCase(fetchGenres.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // })

    // .addCase(fetchAuthors.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(fetchAuthors.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.authors = action.payload;
    // })
    // .addCase(fetchAuthors.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // })

    // .addCase(fetchPublishers.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(fetchPublishers.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.publishers = action.payload;
    // })
    // .addCase(fetchPublishers.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // });
  },
});

export const {} = bookSlice.actions;

export default bookSlice.reducer;
