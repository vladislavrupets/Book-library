const bookBorrowingService = require("../services/postgre-services/bookBorrowingService");

class UserController {
  async getUsersBorrowingsByLogin(req, res) {
    try {
      const { login } = req.params;
      const { category } = req.body;
      const borrowings = await bookBorrowingService.getBorrowingsByLogin(
        login,
        category
      );
      res.status(200).json({ borrowings });
      console.log(borrowings);
    } catch (err) {
      if (err.code === 404) {
        res.status(404).json(err.message);
      } else {
        res.status(500).send();
      }
    }
  }
}

module.exports = new UserController();
