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

      const booksInfo = await bookService.getBooksInfo(
        req.body.category,
        offset,
        itemsPerPage
      );
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
      const {
        writing,
        genres,
        authors,
        publisher,
        releaseYear,
        pagesCount,
        quantity,
        coverUrl,
      } = book;

      await bookService.getBookByData(book, category);

      let writingData = null;
      if (writing.writing_id) {
        writingData = await writingService.getWritingById(
          writing.writing.id,
          category
        );
      } else {
        writingData = await writingService.createWriting(
          writing.title,
          category
        );
      }
      const writingId = writingData.writing_id;

      await genreService.createGenre(genres, category);
      const genresData = await genreService.getGenresIdByName(genres, category);
      const genresIds = genresData.map((genredata) => genredata.genre_id);

      const authorsNames = authors
        .filter((author) => !author.author_id)
        .map((author) => author.full_name);
      let authorsData = [];
      if (authorsNames.length > 0) {
        authorsData = await authorService.createAuthor(authorsNames, category);
      }

      const authorsIds = [
        ...authors
          .filter((author) => author.author_id)
          .map((author) => author.author_id),
        ...authorsData
          .filter((authordata) => authordata.author_id)
          .map((authordata) => authordata.author_id),
      ];

      let publisherData = null;
      publisherData = await publisherService.createPublisher(
        publisher,
        category
      );
      if (!publisherData) {
        publisherData = await publisherService.getPublisherIdByName(
          publisher,
          category
        );
      }
      const publisherId = publisherData.publisher_id;
      console.log("genres" + genresIds);
      console.log("authors" + authorsIds);
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
        release_year: releaseYear,
        publisher_num: publisherId,
        pages_count: pagesCount,
        quantity,
        cover_url: coverUrl,
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

  async searchBooks(req, res) {
    try {
      const { searchData } = req.body;
      const booksInfo = await bookService.searchBooksInfo(searchData);

      res.status(200).json(booksInfo);
    } catch (err) {
      if (err.code === 404) {
        res.status(404).json(err.message);
      } else {
        res.status(500).send();
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
