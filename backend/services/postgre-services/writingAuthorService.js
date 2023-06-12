const pgPool = require("./dbConfig");

class WritingAuthorService {
  async getWritingAuthors(category) {
    try {
      const writingAuthorsData = await pgPool(category).query(
        "select * from WritingAuthor"
      );

      return writingAuthorsData.rows;
    } catch (err) {
      console.error(err);
      throw { code: 404 };
    }
  }

  async createWritingAuthor(writing_id, authorsIds, category) {
    try {
      const writingAuthorData = await pgPool(category).query(
        `insert into WritingAuthor(writing_num, author_num)
            select $1, unnest($2::uuid[])
            on conflict do nothing
        returning *`,
        [writing_id, authorsIds]
      );
      return writingAuthorData.rows[0];
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }

  async updateWritingAuthor(
    writing_id,
    authorsIds,
    writingAuthor_id,
    category
  ) {
    try {
      const writingAuthorData = await pgPool(category).query(
        `update WritingAuthor
        set writing_num = $1, author_num = unnest($2::uuid[])
        where writingAuthor_id = $3
        returning *`,
        [writing_id, authorsIds, writingAuthor_id]
      );

      return writingAuthorData.rows[0];
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }

  async deleteWritingAuthor(writingAuthor_id, category) {
    try {
      await pgPool(category).query(
        "delete from WritingAuthor where writingAuthor_id = $1",
        [writingAuthor_id]
      );
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }
}

module.exports = new WritingAuthorService();
