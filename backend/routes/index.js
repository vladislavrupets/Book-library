const Router = require("express");
const router = new Router();

const authRoutes = require("./authRoutes");

router.use("user/auth", authRoutes);
