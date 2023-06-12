const bookBorrowingService = require("../services/postgre-services/bookBorrowingService");

class BorrowingController {
  async createBorrowing(req, res) {
    try {
      const { bookId, startDate, endDate, category, user_id } = req.body;
      const newBorrowing = await bookBorrowingService.createBorrowing(
        user_id,
        bookId,
        startDate,
        endDate,
        category
      );
      res.status(200).json(newBorrowing);
    } catch (err) {
      if (err.code === 400) {
        res.status(400).json(err.message);
      } else {
        res.status(500).send();
      }
    }
  }
}

module.exports = new BorrowingController();
