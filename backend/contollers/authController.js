const db = require("../db-config");
const sha256 = require("sha256");

class AuthController {
  async signUp(req, res) {
    try {
      const { login, password, full_name, phone_number, trust_raiting } =
        req.body;

      await db().query(`begin`);
      await db().query(
        `insert into Reader
            (username, password, full_name, phone_number, trust_raiting) 
            values ($1, $2, $3, $4, $5)`,
        [login, password, full_name, phone_number, trust_raiting]
      );
      await db().query(`commit`);

      res.status(200).json({
        message: "User " + login + " registered successfully.",
      });
    } catch (err) {
      await db().query("ROLLBACK");
      if (err.code === "23505") {
        if (err.constraint === "users_login_key") {
          res
            .status(400)
            .json({ error: `User with login ${login} already exists` });
        } else if (err.constraint === "users_phone_number_key") {
          res
            .status(400)
            .json({ error: "User with the same phone number already exists" });
        }
      } else {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }

  async signIn(req, res) {
    try {
      const { login, password } = req.body;

      const userCategory = await db().query(
        `select category from Users where Users.login = $1 and Users.password = $2`,
        [login, sha256(password)]
      );

      if (!userCategory.rowCount) {
        res.status(401).json({ error: "Неверные имя пользователя или пароль" });
      } else {
        res.status(200).json({ message: "Authentication successful" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new AuthController();
