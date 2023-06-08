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

  async getPublisherIdByName(publisher_name, category) {
    try {
      const publisherData = await pgPool(category).query(
        `select publisher_id from Publisher where publisher_name = $1`,
        [publisher_name]
      );

      return publisherData.rows[0];
    } catch (err) {
      console.error(err);
      throw { code: 404 };
    }
  }

  async searchPublishers(searchTerm, category) {
    try {
      const publishersData = await pgPool(category).query(
        `select * from Publisher where publisher_name ilike $1`,
        [`%${searchTerm}%`]
      );
      return publishersData.rows;
    } catch (err) {
      console.error(err);
      throw { code: 404 };
    }
  }

  async createPublisher(publisher_name, category) {
    try {
      console.log(publisher_name);
      const publisherData = await pgPool(category).query(
        `insert into Publisher (publisher_name) 
        values ($1)
        on conflict(publisher_name) do nothing
        returning *`,
        [publisher_name]
      );
      console.log(publisherData.rows[0]);
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
