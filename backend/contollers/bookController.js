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
      const booksInfo = await bookService.getBooksInfo(req.body.category);
      console.log(booksInfo);
      res.status(200).json(booksInfo);
    } catch (err) {
      if (err.code === 404) {
        res.status(404).json(err.message);
      } else {
        res.status(500).send();
      }
    }
  }

  async addBook(req, res) {
    try {
      const { book, category } = req.body;

      await bookService.getBookByData(book, category);

      const writingData = await writingService.createWriting(
        book.writing,
        category
      );
      const writingId = writingData.writing_id;

      const genresData = await genreService.createGenre(book.genres, category);
      const genresIds = genresData.map((genredata) => genredata.genre_id);

      const authorsData = await authorService.createAuthor(
        book.authors,
        category
      );
      const authorsIds = authorsData.map((authordata) => authordata.author_id);

      const publisherData = await publisherService.createPublisher(
        book.publisher,
        category
      );
      const publisherId = publisherData.publisher_id;

      await writingGenreService.createWritingGenre(
        writingId,
        genresIds,
        category
      );

      await writingAuthorService.createWritingAuthor(
        writingId,
        authorsIds,
        category
      );

      const newBook = {
        writing_num: writingId,
        release_year: book.releaseYear,
        publisher_num: publisherId,
        pages_count: book.pagesCount,
        quantity: book.quantity,
      };
      await bookService.createBook(newBook, category);

      res.status(200).send();
    } catch (err) {
      if (err.code === 400) {
        res.status(400).json(err.message);
      } else {
        res.status(500).send();
      }
    }
  }
}

module.exports = new BookController();
