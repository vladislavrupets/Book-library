const Router = require("express");
const router = new Router();

const authRoutes = require("./authRoutes");
const bookRoutes = require("./bookRoutes");
const borrowingRoutes = require("./borrowingRoutes");

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

module.exports = router;
