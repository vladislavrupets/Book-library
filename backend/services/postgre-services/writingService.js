const pgPool = require("./dbConfig");

class WritingService {
  async getWritings(category) {
    try {
      const writingsData = await pgPool(category).query(
        "select * from Writing"
      );
      return writingsData.rows;
    } catch (err) {
      console.error(err);
      throw { code: 404 };
    }
  }

  async getWritingById(writing_id, category) {
    try {
      const writingData = await pgPool(category).query(
        "select * from Writing where writing_id = $1",
        [writing_id]
      );
      return writingData.rows[0];
    } catch (err) {
      console.error(err);
      throw { code: 404 };
    }
  }

  async searchWritings(searchTerm, category) {
    try {
      const writingsData = await pgPool(category).query(
        `select * from Writing where title ilike $1`,
        [`%${searchTerm}%`]
      );
      return writingsData.rows;
    } catch (err) {
      console.error(err);
      throw { code: 404 };
    }
  }

  async createWriting(title, category) {
    try {
      const writingData = await pgPool(category).query(
        `insert into Writing (title) 
        values ($1)
        returning *`,
        [title]
      );
      return writingData.rows[0];
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }

  async updateWriting(title, writing_id, category) {
    try {
      const writingData = await pgPool(category).query(
        `update Writing
        set title = $1 
        where writing_id = $2
        returning *`,
        [title, writing_id]
      );

      return writingData.rows[0];
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }

  async deleteWriting(writing_id, category) {
    try {
      await pgPool(category).query(
        "delete from Writing where writing_id = $1",
        [writing_id]
      );
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }
}

module.exports = new WritingService();
