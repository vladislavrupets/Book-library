const pgPool = require("./dbConfig");

class WritingGenreService {
  async getWritingGenres(category) {
    try {
      const writingGenresData = await pgPool(category).query(
        "select * from WritingGenre"
      );

      return writingGenresData.rows;
    } catch (err) {
      console.error(err);
      throw { code: 404 };
    }
  }

  async getWritingGenreByWritingId(writing_id, category) {
    try {
      const writingGenreData = await pgPool(category).query(
        "select * from WritingGenre where writing_num = $1",
        [writing_id]
      );
      return writingGenreData.rows;
    } catch (err) {
      console.error(err);
      throw { code: 404 };
    }
  }

  async createWritingGenre(writing_id, genresIds, category) {
    try {
      const writingGenreData = await pgPool(category).query(
        `insert into WritingGenre(writing_num, genre_num)
            select $1, unnest($2::uuid[])
            on conflict do nothing
        returning *`,
        [writing_id, genresIds]
      );

      return writingGenreData.rows[0];
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }

  async updateWritingGenre(writing_id, genresIds, writingGenre_Id, category) {
    try {
      const writingGenreData = await pgPool(category).query(
        `update WritingGenre
        set writing_num = $1, genre_num = unnest($2::uuid[])
        where writingGenre_id = $3
        returning *`,
        [writing_id, genresIds, writingGenre_Id]
      );

      return writingGenreData.rows[0];
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }

  async deleteWritingGenre(writingGenre_Id, category) {
    try {
      await pgPool(category).query(
        "delete from WritingGenre where writingGenre_id = $1",
        [writingGenre_Id]
      );
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }
}

module.exports = new WritingGenreService();
