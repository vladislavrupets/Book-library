const pgPool = require("./dbConfig");
const writingService = require("./writingService");
const authorService = require("./authorService");
const genreService = require("./genreService");
const writingGenreService = require("./writingGenreService");
const writingAuthorService = require("./writingAuthorService");
const publisherService = require("./publisherService");

class BookService {
  async getBooksInfo(category) {
    try {
      const data = await pgPool(category).query(
        `select
          b.book_id,
          jsonb_build_object(
            'title', wr.title,
            'writing_id', wr.writing_id
          ) as writing,
          
          jsonb_agg(
            jsonb_build_object(
              'full_name', au.full_name,
              'author_id', au.author_id
            )
          ) as authors,

          jsonb_agg(
            jsonb_build_object(
              'genre_name', g.genre_name,
              'genre_id', g.genre_id
            ) 
          )as genres,

          jsonb_build_object(
            'publisher_name', p.publisher_name,
            'publisher_id', p.publisher_id
          ) as publisher,

          b.release_year,
          b.pages_count,
          b.quantity

        from Book b
          join Publisher p on p.publisher_id = b.publisher_num
          join Writing wr on wr.writing_id = b.writing_num
          join WritingAuthor wa on wa.writing_num = wr.writing_id
          join Author au on au.author_id = wa.author_num
          join WritingGenre wg on wg.writing_num = wr.writing_id
          join Genre g on g.genre_id = wg.genre_num
        group by
         b.book_id, wr.title, wr.writing_id, p.publisher_name, p.publisher_id,
         b.release_year, b.pages_count, b.quantity`
      );

      return data.rows;
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }

  async getBookByData(book, category) {
    try {
      // Checking the book for uniqueness
      const data = await pgPool(category).query(
        `select b.book_id, wr.title, au.full_name, g.genre_name, p.publisher_name, b.release_year, b.pages_count, b.quantity
        from Book b
        join Publisher p on p.publisher_id = b.publisher_num
        join Writing wr on wr.writing_id = b.writing_num
        join WritingAuthor wa on wa.writing_num = wr.writing_id
        join Author au on au.author_id = wa.author_num
        join WritingGenre wg on wg.writing_num = wr.writing_id
        join Genre g on g.genre_id = wg.genre_num
        where wr.title = $1 
          and au.full_name = any($2::varchar[])
          and g.genre_name = any($3::varchar[])
          and b.release_year = $4
          and p.publisher_name = $5`,
        [
          book.writing,
          book.authors,
          book.genres,
          book.releaseYear,
          book.publisher,
        ]
      );

      if (data.rowCount !== 0) {
        throw { code: 400, message: "This book already exists" };
      }
    } catch (err) {
      if (err.code === 400) {
        throw err;
      } else {
        console.error(err);
        throw { code: 500 };
      }
    }
  }

  async createBook(book, category) {
    const { writing_num, publisher_num, release_year, pages_count, quantity } =
      book;

    const client = await pgPool(category).connect();

    try {
      await client.query("begin");

      await client.query(
        `insert into Book
            (writing_num, release_year, publisher_num, pages_count, quantity)
            values ($1, $2, $3, $4, $5)`,
        [writing_num, release_year, publisher_num, pages_count, quantity]
      );

      await client.query("commit");
    } catch (err) {
      await client.query("rollback");

      console.error(err);
      throw { code: 500 };
    } finally {
      client.release();
    }
  }
}

module.exports = new BookService();
