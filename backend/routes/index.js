const Router = require("express");
const router = new Router();

const authRoutes = require("./authRoutes");
const bookRoutes = require("./bookRoutes");

router.use((req, res, next) => {
  if (req.sessionID && req.session.user) {
    req.body.category = req.session.user.category;
  }
  next();
});

router.use("/auth", authRoutes);
router.use("/books", bookRoutes);

module.exports = router;
