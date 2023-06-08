const pgPool = require("./dbConfig");

class GenreService {
  async getGenres(category) {
    try {
      const genresData = await pgPool(category).query("select * from Genre");
      return genresData.rows;
    } catch (err) {
      console.error(err);
      throw { code: 404 };
    }
  }

  async getGenresIdByName(genres, category) {
    try {
      const genreData = await pgPool(category).query(
        `select genre_id from Genre where genre_name = any($1::varchar[])`,
        [genres]
      );

      return genreData.rows;
    } catch (err) {
      console.error(err);
      throw { code: 404 };
    }
  }

  async searchGenres(searchTerm, category) {
    try {
      const genresData = await pgPool(category).query(
        `select * from Genre where genre_name ilike $1`,
        [`%${searchTerm}%`]
      );
      return genresData.rows;
    } catch (err) {
      console.error(err);
      throw { code: 404 };
    }
  }

  async createGenre(genres, category) {
    try {
      const genreData = await pgPool(category).query(
        `insert into Genre(genre_name) 
        select unnest($1::varchar[])
        on conflict(genre_name) do nothing
        returning *`,
        [genres]
      );

      return genreData.rows;
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }

  async updateGenre(genre_name, genre_id, category) {
    try {
      const genreData = await pgPool(category).query(
        `update Genre
        set genre_name = $1 
        where genre_id = $2
        returning *`,
        [genre_name, genre_id]
      );

      return genreData.rows;
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }

  async deleteGenre(genre_id, category) {
    try {
      await pgPool(category).query("delete from Genre where genre_id = $1", [
        genre_id,
      ]);
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }
}

module.exports = new GenreService();
