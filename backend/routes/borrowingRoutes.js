const Router = require("express");
const router = new Router();

const borrowingController = require("../contollers/borrowingController");

router.post("/create", borrowingController.createBorrowing);
router.get("/get-borrowing-requests", borrowingController.getBorrowingRequests);
router.get("/get-active-borrowings", borrowingController.getActiveBorrowings);
router.post("/approve-borrowing", borrowingController.approveBorrowing);
router.post("/return-book", borrowingController.approveReturn);

module.exports = router;
