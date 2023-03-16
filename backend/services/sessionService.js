const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

const pgPool = require("./postgre-services/dbConfig");

module.exports = session({
  store: new pgSession({
    pool: pgPool("postgres"),
    tableName: "session",
  }),
  secret: process.env.COOKIE_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
});
