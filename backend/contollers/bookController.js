const bookService = require("../services/postgre-services/bookService");
const writingService = require("../services/postgre-services/writingService");
const authorService = require("../services/postgre-services/authorService");
const genreService = require("../services/postgre-services/genreService");
const writingGenreService = require("../services/postgre-services/writingGenreService");
const writingAuthorService = require("../services/postgre-services/writingAuthorService");
const publisherService = require("../services/postgre-services/publisherService");

class BookController {
  async getBooks(req, res) {
    try {
      const { offset, itemsPerPage } = req.params;
      const { category } = req.body;

      const booksInfo = await bookService.getBooksInfo(
        category,
        offset,
        itemsPerPage
      );
      const booksCount = await bookService.getBooksCount(category);

      res.status(200).json({ booksInfo, booksCount });
    } catch (err) {
      if (err.code === 404) {
        res.status(404).json(err.message);
      } else {
        res.status(500).json("Internal server error");
      }
    }
  }

  async addBook(req, res) {
    try {
      const { book, category } = req.body;
      await bookService.getBookByData(book, category);
      await bookService.createBook(book, category);
      res.status(200).send();
    } catch (err) {
      if (err.code === 400) {
        res.status(400).json(err.message);
      } else {
        res.status(500).json("Internal server error");
      }
    }
  }

  async getBookById(req, res) {
    try {
      const { bookId } = req.params;
      const booksInfo = await bookService.getBookById(bookId);
      res.status(200).json({ booksInfo });
    } catch (err) {
      if (err.code === 404) {
        res.status(404).json(err.message);
      } else {
        res.status(500).json("Internal server error");
      }
    }
  }

  async searchBooks(req, res) {
    try {
      const { category } = req.body;
      const { offset, itemsPerPage, searchData } = req.params;

      const booksInfo = await bookService.searchBooksInfo(
        offset,
        itemsPerPage,
        searchData,
        category
      );
      const booksCount = await bookService.getBooksCount(category);

      res.status(200).json({ booksInfo, booksCount });
    } catch (err) {
      if (err.code === 404) {
        res.status(404).json(err.message);
      } else {
        res.status(500).json("Internal server error");
      }
    }
  }

  // async getWritings(req, res) {
  //   try {
  //     const writings = await writingService.getWritings();
  //     res.status(200).json(writings);
  //   } catch (err) {
  //     res.status(500).send();
  //   }
  // }

  // async searchWritings(req, res) {
  //   try {
  //     const writings = await writingService.searchWritings(
  //       req.params.searchTerm
  //     );
  //     res.status(200).json(writings);
  //   } catch (err) {
  //     res.status(500).send();
  //   }
  // }

  // async getGenres(req, res) {
  //   try {
  //     const genres = await genreService.getGenres();
  //     res.status(200).json(genres);
  //   } catch (err) {
  //     res.status(500).send();
  //   }
  // }

  // async searchGenres(req, res) {
  //   try {
  //     const genres = await genreService.searchGenres(req.params.searchTerm);
  //     res.status(200).json(genres);
  //   } catch (err) {
  //     res.status(500).send();
  //   }
  // }

  // async getAuthors(req, res) {
  //   try {
  //     const authors = await authorService.getAuthors();
  //     res.status(200).json(authors);
  //   } catch (err) {
  //     res.status(500).send();
  //   }
  // }

  // async searchAuthors(req, res) {
  //   try {
  //     const authors = await authorService.searchAuthors(req.params.searchTerm);
  //     res.status(200).json(authors);
  //   } catch (err) {
  //     res.status(500).send();
  //   }
  // }

  // async getPublishers(req, res) {
  //   try {
  //     const publishers = await publisherService.getPublishers();
  //     res.status(200).json(publishers);
  //   } catch (err) {
  //     res.status(500).send();
  //   }
  // }

  // async searchPublishers(req, res) {
  //   try {
  //     const publishers = await publisherService.searchPublishers(
  //       req.params.searchTerm
  //     );
  //     res.status(200).json(publishers);
  //   } catch (err) {
  //     res.status(500).send();
  //   }
  // }
}

module.exports = new BookController();
