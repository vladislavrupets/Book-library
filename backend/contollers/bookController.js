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

  async updateBook(req, res) {
    try {
      const { book, category } = req.body;
      await bookService.updateBook(book, category);
      res.status(200).send();
    } catch (err) {
      res.status(500).json("Internal server error");
    }
  }

  async deleteBook(req, res) {
    try {
      const { bookId, category } = req.body;
      await bookService.deleteBook(bookId, category);
      res.status(200).send();
    } catch (err) {
      res.status(500).json("Internal server error");
    }
  }
}

module.exports = new BookController();
