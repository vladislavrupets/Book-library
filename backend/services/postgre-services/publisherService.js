const pgPool = require("./dbConfig");

class PublisherService {
  async getPublishers(category) {
    try {
      const publishersData = await pgPool(category).query(
        "select * from Publisher"
      );
      return publishersData.rows;
    } catch (err) {
      console.error(err);
      throw { code: 404 };
    }
  }

  async createPublisher(publisher_name, category) {
    try {
      const publisherData = await pgPool(category).query(
        `insert into Publisher (publisher_name) 
        values ($1)
        returning *`,
        [publisher_name]
      );

      return publisherData.rows[0];
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }

  async updatePublisher(publisher_name, publisher_id, category) {
    try {
      const publisherData = await pgPool(category).query(
        `update Publisher
        set publisher_name = $1 
        where publisher_id = $2
        returning *`,
        [publisher_name, publisher_id]
      );

      return publisherData.rows[0];
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }

  async deletePublisher(publisher_id, category) {
    try {
      await pgPool(category).query(
        "delete from Publisher where publisher_id = $1",
        [publisher_id]
      );
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }
}

module.exports = new PublisherService();
