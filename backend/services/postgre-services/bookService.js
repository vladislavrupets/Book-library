const pgPool = require("./dbConfig");

class BookServise {
  async getBooks(category, callback) {
    try {
      const data = await pgPool(category).query("select * from Book");
      callback(null, data.rows);
    } catch (err) {
      console.error(err);
      const customError = new Error();
      customError.code = 500;
      callback(customError);
    }
  }

  async getBookByData(book, category, callback) {
    try {
      const authorsNames = book.authors.map((author) => author.name);
      //checking the book for uniqueness
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
          and au.full_name in(select unnest($2::varchar[]))
          and g.genre_name in(select unnest($3::varchar[]))
          and b.release_year = $4
          and p.publisher_name = $5`,
        [
          book.title,
          authorsNames,
          book.genres,
          book.releaseYear,
          book.publisher,
        ]
      );

      if (data.rowCount !== 0) {
        const customError = new Error("This book already exists");
        customError.code = 400;
        throw customError;
      }
      callback(null);
    } catch (err) {
      if (err.code === 400) {
        callback(err);
      } else {
        console.error(err);
        const customError = new Error();
        customError.code = 500;
        callback(customError);
      }
    }
  }

  async createBook(book, category, callback) {
    //function to get new and existing IDs of authors
    const getAuthorsIds = async () => {
      const newAuthorsNames = book.authors
        .filter((author) => author.isNew)
        .map((author) => author.name);

      let newAuthorsIds = null;
      if (newAuthorsNames.length !== 0) {
        const authorsData = await client.query(
          `insert into Author(full_name) 
            select unnest($1::varchar[])
            returning author_id`,
          [newAuthorsNames]
        );
        console.log(authorsData);
        newAuthorsIds = authorsData.rows.map(
          (authorData) => authorData.author_id
        );
      }
      const existAuthorsIds = book.authors
        .filter((author) => author.id)
        .map((author) => author.id);
      return [...existAuthorsIds, ...newAuthorsIds];
    };
    //extract client for transaction
    const client = await pgPool(category).connect();

    try {
      await client.query("begin");

      const genresData = await client.query(
        `insert into Genre(genre_name) 
            select unnest($1::varchar[])
            on conflict(genre_name) do update set genre_name = excluded.genre_name
            returning genre_id`,
        [book.genres]
      );
      const genresIds = genresData.rows.map((genredata) => genredata.genre_id);

      const writingData = await client.query(
        `insert into Writing(title)
            values ($1)
            returning writing_id`,
        [book.title]
      );
      const writingId = writingData.rows[0].writing_id;

      await client.query(
        `insert into WritingGenre(writing_num, genre_num)
            select $1, unnest($2::uuid[])`,
        [writingId, genresIds]
      );

      const authorsIds = await getAuthorsIds();
      await client.query(
        `insert into WritingAuthor(writing_num, author_num)
            select $1, unnest($2::uuid[])`,
        [writingId, authorsIds]
      );

      const publisherData = await client.query(
        `insert into Publisher(publisher_name)
            values ($1)
            on conflict(publisher_name) do update set publisher_name = excluded.publisher_name
            returning publisher_id`,
        [book.publisher]
      );
      const publisherId = publisherData.rows[0].publisher_id;

      await client.query(
        `insert into Book
            (writing_num, release_year, publisher_num, pages_count, quantity)
            values ($1, $2, $3, $4, $5)`,
        [
          writingId,
          book.releaseYear,
          publisherId,
          book.pagesCount,
          book.quantity,
        ]
      );

      await client.query("commit");
      callback(null);
    } catch (err) {
      await client.query("rollback");

      console.error(err);
      const customError = new Error();
      customError.code = 500;
      callback(customError);
    } finally {
      client.release();
    }
  }
}

module.exports = new BookServise();
