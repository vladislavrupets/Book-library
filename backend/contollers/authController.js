const sha256 = require("sha256");

const pgPool = require("../db-config");

class AuthController {
  async register(req, res) {
    const { fullName, phoneNumber, login, password, trustRaiting } = req.body;
    console.log(req.body);
    try {
      const data = await pgPool().query(
        `insert into Users
            (full_name, phone_number, login, password, trust_rating) 
            values ($1, $2, $3, $4, $5)`,
        [fullName, phoneNumber, login, password, trustRaiting]
      );

      const user = data.rows[0];
      req.session.user = {
        id: user.id,
        full_name: user.full_name,
        category: user.category,
      };

      res.status(200).json({
        message: `User ${login} registered successfully.`,
      });
    } catch (err) {
      if (err.code === "23505") {
        if (err.constraint === "users_login_key") {
          res.status(400).json({
            error: `User with the same login already exists`,
          });
          return;
        } else if (err.constraint === "users_phone_number_key") {
          res
            .status(400)
            .json({ error: "User with the same phone number already exists." });
          return;
        }
      } else {
        console.error(err);
        res.status(500).send();
      }
    }
  }

  async login(req, res) {
    const { login, password } = req.body;
    console.log(req.body);
    try {
      const data = await pgPool().query(
        `select * from Users where Users.login = $1 and Users.password = $2`,
        [login, sha256(password)]
      );
      if (data.rowCount === 0) {
        res.status(401).json({ error: "Invalid username or password." });
        return;
      } else {
        const user = data.rows[0];
        req.session.user = {
          user_id: user.user_id,
          full_name: user.full_name,
          category: user.category,
        };

        res.status(200).json({ message: "Authentication successful." });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  }

  async logout(req, res) {
    try {
      await req.session.destroy();
      res.clearCookie("connect.sid");
      res.status(200).send();
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  }

  async fetchUser(req, res) {
    if (req.sessionID && req.session.user) {
      res.status(200).json({ user: req.session.user });
    } else {
      res.status(403).json({ user: { category: "guest" } });
    }
  }
}

module.exports = new AuthController();
