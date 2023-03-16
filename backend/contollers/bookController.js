const sha256 = require("sha256");

const bookService = require("../services/postgre-services/bookService");

class BookController {
  addBook(req, res) {
    const { book, category } = req.body;
    bookService.getBookByData(book, category, (err) => {
      if (err) {
        if (err.code === 400) {
          res.status(400).json(err.message);
        } else {
          res.status(500).send();
        }
      } else {
        bookService.createBook(book, category, (err) => {
          if (err) {
            res.status(500).send();
          } else {
            res.status(200).send();
          }
        });
      }
    });
  }
}
module.exports = new BookController();
