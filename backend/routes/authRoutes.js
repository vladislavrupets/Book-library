const Router = require("express");
const router = new Router();

const authController = require("../contollers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/fetch-user", authController.fetchUser);

module.exports = router;
