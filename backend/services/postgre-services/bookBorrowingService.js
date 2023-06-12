const pgPool = require("./dbConfig");

class bookBorrowingService {
  async createBorrowing(user_id, book_id, start_date, end_date, category) {
    try {
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

  async getBorrowingsByLogin(login, category) {
    try {
      const borrowingData = await pgPool(category).query(
        `select bb.borrowing_id, w.title, bb.start_date, bb.end_date, bb.status, lu.login, lu.full_name
          from BookBorrowing bb
          join Users u on u.user_id = bb.reader_num
          left join Users lu on lu.user_id = bb.librarian_num
          join Book b on b.book_id = bb.book_num
          join Writing w on w.writing_id = b.writing_num
          where u.login = $1`,
        [login]
      );

      if (borrowingData.rows.length === 0) {
        throw { code: 404, message: "No borrowings found" };
      }
      return borrowingData.rows;
    } catch (err) {
      if (err.code === 404) {
        throw err;
      } else {
        console.error(err);
        throw { code: 404 };
      }
    }
  }
}

module.exports = new bookBorrowingService();
