const express = require("express");
const app = express();
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const cors = require("cors");
require("dotenv").config();

const pgPool = require("./db-config");
const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT || 8000;
const IP = process.env.IP || "localhost";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use(
  session({
    store: new pgSession({
      pool: pgPool("postgres"),
      tableName: "sessions",
    }),
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);

app.use("/user", authRoutes);

app.listen(PORT, IP, () => {
  console.log("server started on " + IP + ":" + PORT);
});
