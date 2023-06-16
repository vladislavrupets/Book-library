const Router = require("express");
const router = new Router();

const userController = require("../contollers/userController");

router.get(
  "/get-borrowings-by-login/:login",
  userController.getUsersBorrowingsByLogin
);
router.get("/get-users", userController.getUsers);

module.exports = router;
