const Router = require("express");
const router = new Router();

const borrowingController = require("../contollers/borrowingController");

router.post("/create", borrowingController.createBorrowing);

module.exports = router;
