const Router = require("express");
const router = new Router();

const AuthController = require("../contollers/authController");
const UserServise = require("../services/postgre-services/userService");

let role = "";

router.use((req, res, next) => {
  role = req.body.category;
  next();
});

const userServise = new UserServise(role);
const authController = new AuthController(userServise);

router
  .route("/")
  .post("/register", authController.register)
  .post("/login", authController.login)
  .post("/logout", authController.logout)
  .get("/fetch-user", authController.fetchUser);

module.exports = router;
