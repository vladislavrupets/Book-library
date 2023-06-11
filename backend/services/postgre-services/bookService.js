const pgPool = require("./dbConfig");

const queryJsonBAgg = `
  jsonb_build_object(
    'title', wr.title,
    'writing_id', wr.writing_id
  ) as writing,
  (
    select jsonb_agg(
      jsonb_build_object(
        'full_name', au.full_name,
        'author_id', au.author_id
      )
    )
    from WritingAuthor wa join Author au on au.author_id = wa.author_num 
    where wa.writing_num = wr.writing_id
    and wr.writing_id = b.writing_num
  ) as authors,
  (
    select jsonb_agg(
      jsonb_build_object(
        'genre_name', g.genre_name,
        'genre_id', g.genre_id
      )
    )
    from WritingGenre wg join Genre g on g.genre_id = wg.genre_num 
    where wg.writing_num = wr.writing_id
    and wr.writing_id = b.writing_num
  ) as genres,
  jsonb_build_object(
    'publisher_name', p.publisher_name,
    'publisher_id', p.publisher_id
  ) as publisher`;

class BookService {
  async searchBooksInfo(searchData, category) {
    console.log(searchData);
    try {
      let query = `SELECT b.book_id, ${queryJsonBAgg}, b.release_year, b.pages_count, b.quantity, b.cover_url
    FROM Book b
      join Publisher p ON p.publisher_id = b.publisher_num
      join Writing wr ON wr.writing_id = b.writing_num
      join WritingAuthor wa ON wa.writing_num = wr.writing_id
      join Author au ON au.author_id = wa.author_num
      join WritingGenre wg ON wg.writing_num = wr.writing_id
      join Genre g ON g.genre_id = wg.genre_num
    `;

      const conditions = [];
      const params = searchData.split(";");
      params.forEach((param) => {
        const [field, value] = param.split("=");
        if (value) {
          switch (field) {
            case "title":
              conditions.push(`wr.title ilike '%${value}%'`);
              break;
            case "authors":
              const authors = value.split(",");
              const authorConditions = authors.map(
                (author) => `au.full_name ilike any(array['%${author}%'])`
              );
              conditions.push(`(${authorConditions.join(" or ")})`);
              break;
            case "genres":
              const genres = value.split(",");
              const genreConditions = genres.map(
                (genre) => `g.genre_name ilike any(array['%${genre}%'])`
              );
              conditions.push(`(${genreConditions.join(" or ")})`);
              break;
            case "publisher":
              conditions.push(`p.publisher_name ilike '%${value}%'`);
              break;
            case "releaseYear":
              const releaseYear = parseInt(value);
              if (!isNaN(releaseYear)) {
                conditions.push(`b.release_year = ${releaseYear}`);
              }
              break;
            case "pagesCount":
              conditions.push(`b.pages_count = ${value}`);
              break;
            default:
              break;
          }
        }
      });

      if (conditions.length > 0) {
        query += `where ${conditions.join(" and ")}`;
      }

      query += ` group by b.book_id, wr.title, wr.writing_id, p.publisher_name, p.publisher_id, 
    b.release_year, b.pages_count, b.quantity, b.cover_url`;

      const booksData = await pgPool(category).query(query);
      if (booksData.rowCount === 0) {
        throw { code: 404, message: "No books found" };
      }

      return booksData.rows;
    } catch (err) {
      if (err.code === 404) {
        throw err;
      } else {
        console.error(err);
        throw { code: 500 };
      }
    }
  }

  async getBooksInfo(category, offset, limit) {
    try {
      const booksData = await pgPool(category).query(
        `select b.book_id, ${queryJsonBAgg}, b.release_year, b.pages_count, b.quantity, b.cover_url
        from Book b
          join Publisher p on p.publisher_id = b.publisher_num
          join Writing wr on wr.writing_id = b.writing_num
        group by
          b.book_id, wr.title, wr.writing_id, p.publisher_name, p.publisher_id,
          b.release_year, b.pages_count, b.quantity, b.cover_url
          offset $1 limit $2`,
        [offset, limit]
      );

      return booksData.rows;
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }

  async getBookByData(book, category) {
    try {
      // Checking the book for uniqueness
      const bookData = await pgPool(category).query(
        `select b.book_id, b.release_year, b.pages_count, b.quantity
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

      if (bookData.rowCount !== 0) {
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
    const {
      writing_num,
      publisher_num,
      release_year,
      pages_count,
      quantity,
      cover_url,
    } = book;

    const client = await pgPool(category).connect();
    try {
      await client.query(
        `insert into Book
            (writing_num, release_year, publisher_num, pages_count, quantity, cover_url)
            values ($1, $2, $3, $4, $5, $6)`,
        [
          writing_num,
          release_year,
          publisher_num,
          pages_count,
          quantity,
          cover_url,
        ]
      );
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }
  async updateBook() {}
}

module.exports = new BookService();
