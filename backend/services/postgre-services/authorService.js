const pgPool = require("./dbConfig");

class AuthorService {
  async getAuthors(category) {
    try {
      const authorsData = await pgPool(category).query("select * from Author");
      return authorsData.rows;
    } catch (err) {
      console.error(err);
      throw { code: 404 };
    }
  }

  async createAuthor(authors, category) {
    try {
      const authorData = await pgPool(category).query(
        `insert into Author(full_name) 
        select unnest($1::varchar[])
        on conflict(full_name) do nothing
        returning *`,
        [authors]
      );

      return authorData.rows;
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }

  async updateAuthor(full_name, author_id, category) {
    try {
      const authorData = await pgPool(category).query(
        `update Author
        set full_name = $1 
        where author_id = $2
        returning *`,
        [full_name, author_id]
      );

      return authorData.rows;
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }

  async deleteAuthor(author_id, category) {
    try {
      await pgPool(category).query("delete from Author where author_id = $1", [
        author_id,
      ]);

      return null;
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }
}

module.exports = new AuthorService();
