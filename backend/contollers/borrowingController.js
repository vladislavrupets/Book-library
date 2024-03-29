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
        console.log(err.message);
        res.status(400).json(err.message);
      } else {
        res.status(500).json("Internal server error");
      }
    }
  }

  async getBorrowingRequests(req, res) {
    try {
      const { category } = req.body;
      const borrowings = await bookBorrowingService.getPendingBorrowings(
        category
      );

      const borrowingsCount =
        await bookBorrowingService.getPendingBorrowingsCount(category);
      res.status(200).json({ borrowings, borrowingsCount });
    } catch (err) {
      if (err.code === 404) {
        res.status(404).json(err.message);
      } else {
        res.status(500).json("Internal server error");
      }
    }
  }

  async getActiveBorrowings(req, res) {
    try {
      const { category, user_id } = req.body;

      let borrowings = null;
      if (category === "administrator") {
        borrowings = await bookBorrowingService.getAllActiveBorrowings(
          category
        );
      } else {
        borrowings = await bookBorrowingService.getActiveBorrowings(
          user_id,
          category
        );
      }

      const borrowingsCount =
        await bookBorrowingService.getActiveBorrowingsCount(category);
      res.status(200).json({ borrowings, borrowingsCount });
    } catch (err) {
      if (err.code === 404) {
        res.status(404).json(err.message);
      } else {
        res.status(500).json("Internal server error");
      }
    }
  }

  async approveBorrowing(req, res) {
    try {
      const { borrowingId, category, user_id } = req.body;
      await bookBorrowingService.updateBorrowingStatusToActive(
        borrowingId,
        user_id,
        category
      );
      res.status(200).send();
    } catch (err) {
      if (err.code === 400) {
        res.status(400).json(err.message);
      } else {
        res.status(500).json("Internal server error");
      }
    }
  }

  async approveReturn(req, res) {
    try {
      const { borrowingId, actualEndDate, category } = req.body;
      await bookBorrowingService.updateBorrowingStatusToReturned(
        borrowingId,
        actualEndDate,
        category
      );
      res.status(200).send();
    } catch (err) {
      if (err.code === 400) {
        res.status(400).json(err.message);
      } else {
        res.status(500).json("Internal server error");
      }
    }
  }

  async rejectBorrowing(req, res) {
    try {
      const { borrowingId, category } = req.body;
      await bookBorrowingService.updateBorrowingStatusToRejected(
        borrowingId,
        category
      );
      res.status(200).send();
    } catch (err) {
      if (err.code === 400) {
        res.status(400).json(err.message);
      } else {
        res.status(500).json("Internal server error");
      }
    }
  }
}

module.exports = new BorrowingController();
