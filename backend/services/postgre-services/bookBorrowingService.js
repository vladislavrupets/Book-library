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
        `select bb.borrowing_id, w.title, bb.start_date, bb.end_date, bb.status
          from BookBorrowing bb
          join Users u on u.user_id = bb.reader_num
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
        throw { code: 500 };
      }
    }
  }

  async getPendingBorrowings(category) {
    try {
      const borrowingData = await pgPool(category).query(
        `select bb.borrowing_id, u.login, w.title, bb.start_date, bb.end_date
          from BookBorrowing bb
          join Users u on u.user_id = bb.reader_num
          join Book b on b.book_id = bb.book_num
          join Writing w on w.writing_id = b.writing_num
          where bb.status = 'pending'
          order by bb.start_date asc`
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
        throw { code: 500 };
      }
    }
  }

  async updateBorrowingStatusToActive(borrowing_id, librarian_num, category) {
    try {
      await pgPool(category).query(
        `update BookBorrowing
      set status = 'active', librarian_num = $1
      where borrowing_id = $2`,
        [librarian_num, borrowing_id]
      );
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }

  async getAllActiveBorrowings(category) {
    try {
      const borrowingData = await pgPool(category).query(
        `select bb.borrowing_id, u.login as user_login, w.title, bb.start_date, 
        bb.end_date, lu.login as librarian_login, lu.full_name as librarian_name
          from BookBorrowing bb
          join Users u on u.user_id = bb.reader_num
          join Book b on b.book_id = bb.book_num
          join Writing w on w.writing_id = b.writing_num
          left join Users lu on lu.user_id = bb.librarian_num
          where bb.status = 'active'
          order by bb.start_date asc`
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
        throw { code: 500 };
      }
    }
  }

  async getActiveBorrowings(librarian_num, category) {
    try {
      const borrowingData = await pgPool(category).query(
        `select bb.borrowing_id, u.login as user_login, w.title, bb.start_date,
        bb.end_date, lu.login as librarian_login, lu.full_name as librarian_name
          from BookBorrowing bb
          join Users u on u.user_id = bb.reader_num
          join Book b on b.book_id = bb.book_num
          join Writing w on w.writing_id = b.writing_num
          left join Users lu on lu.user_id = bb.librarian_num
          where bb.status = 'active' and bb.librarian_num = $1
          order by bb.start_date asc`,
        [librarian_num]
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
        throw { code: 500 };
      }
    }
  }

  async getActiveBorrowingsCount(category) {
    try {
      const borrowingData = await pgPool(category).query(
        `select count(*) as count
          from BookBorrowing bb
          where bb.status = 'active'`
      );
      return borrowingData.rows[0].count;
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }

  async getPendingBorrowingsCount(category) {
    try {
      const borrowingData = await pgPool(category).query(
        `select count(*) as count
          from BookBorrowing bb
          where bb.status = 'pending'`
      );
      return borrowingData.rows[0].count;
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }

  async updateBorrowingStatusToReturned(borrowing_id, end_date, category) {
    try {
      await pgPool(category).query(
        `update BookBorrowing
      set status = 'completed', end_date = $1
      where borrowing_id = $2`,
        [end_date, borrowing_id]
      );
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }

  async getBorrowingsCountByLogin(login, category) {
    try {
      const borrowingData = await pgPool(category).query(
        `select count(*) as count
          from BookBorrowing bb
          join Users u on u.user_id = bb.reader_num
          where u.login = $1`,
        [login]
      );
      return borrowingData.rows[0].count;
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }
}

module.exports = new bookBorrowingService();
