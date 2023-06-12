const Router = require("express");
const router = new Router();

const userController = require("../contollers/userController");

router.post(
  "/get-borrowings-by-login/:login",
  userController.getUsersBorrowingsByLogin
);

module.exports = router;
