const Router = require("express");
const router = new Router();

const userController = require("../contollers/userController");

router.get(
  "/get-borrowings-by-login/:login",
  userController.getUsersBorrowingsByLogin
);

module.exports = router;
