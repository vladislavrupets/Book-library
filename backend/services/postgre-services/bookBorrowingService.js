const pgPool = require("./dbConfig");

class bookBorrowingService {
  async createBorrowing(user_id, book_id, start_date, end_date, category) {
    try {
      console.log(user_id, book_id, start_date, end_date, category);
      const borrowingData = await pgPool(category).query(
        `insert into BookBorrowing (reader_num, book_num, start_date, end_date)
                values ($1, $2, $3, $4)
                returning *`,
        [user_id, book_id, start_date, end_date]
      );
      return borrowingData.rows[0];
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }
}

module.exports = new bookBorrowingService();
