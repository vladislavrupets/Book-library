const Router = require("express");
const router = new Router();

const authRoutes = require("./authRoutes");
const bookRoutes = require("./bookRoutes");
const borrowingRoutes = require("./borrowingRoutes");
const userRoutes = require("./userRoutes");

router.use((req, res, next) => {
  if (req.sessionID && req.session.user) {
    req.body.category = req.session.user.category;
    req.body.user_id = req.session.user.user_id;
  }
  next();
});

router.use("/auth", authRoutes);
router.use("/books", bookRoutes);
router.use("/borrowings", borrowingRoutes);
router.use("/users", userRoutes);

module.exports = router;
