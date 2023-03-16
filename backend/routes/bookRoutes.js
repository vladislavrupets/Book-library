const Router = require("express");
const router = new Router();

const bookController = require("../contollers/bookController");

router.post("/add-book", bookController.addBook);

module.exports = router;
