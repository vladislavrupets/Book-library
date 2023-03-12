const Router = require("express");
const router = new Router();

const authRoutes = require("./authRoutes");

router.use((req, res, next) => {
  if (req.sessionID && req.session.user) {
    req.body.category = req.session.user.category;
  } else {
    req.body.category = "guest";
  }
  next();
});

router.use("/auth", authRoutes);

module.exports = router;
