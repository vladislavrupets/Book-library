const Router = require("express");
const router = new Router();

const authController = require("../contollers/authController");

router.post("/sign_up", authController.signUp);
router.get("/sign_in", authController.signIn);

module.exports = router;
