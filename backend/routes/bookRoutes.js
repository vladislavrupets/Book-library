const Router = require("express");
const router = new Router();

const bookController = require("../contollers/bookController");

router.post("/add-book", bookController.addBook);
router.get("/get-all/:offset/:itemsPerPage", bookController.getBooks);
router.get(
  "/search-books/:offset/:itemsPerPage/:searchData?",
  bookController.searchBooks
);
router.get("/get-by-id/:bookId", bookController.getBookById);
router.post("/update-book", bookController.updateBook);
router.post("/delete-book", bookController.deleteBook);
// router.get("/writing/get-all", bookController.getWritings);
// router.get("/writing/search/:searchTerm", bookController.searchWritings);
// router.get("/genre/get-all", bookController.getGenres);
// router.get("/genre/search/:searchTerm", bookController.searchGenres);
// router.get("/author/get-all", bookController.getAuthors);
// router.get("/author/search/:searchTerm", bookController.searchAuthors);
// router.get("/publisher/get-all", bookController.getPublishers);
// router.get("/publisher/search/:searchTerm", bookController.searchPublishers);

module.exports = router;
