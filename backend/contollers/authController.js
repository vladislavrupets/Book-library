const sha256 = require("sha256");

const userService = require("../services/postgre-services/userService");

class AuthController {
  register(req, res) {
    const user = req.body;
    userService.createUser(user, (err, newUser) => {
      if (err) {
        if (err.code === 400) {
          res.status(400).json(err.message);
        } else {
          res.status(500).send();
        }
      } else {
        try {
          req.session.user = {
            user_id: newUser.user_id,
            full_name: newUser.full_name,
            category: newUser.category,
          };
          res.status(200).send();
        } catch (err) {
          res.status(500).send();
        }
      }
    });
  }

  async login(req, res) {
    const user = {
      login: req.body.login,
      password: sha256(req.body.password),
      category: req.body.category,
    };
    userService.getUserByData(user, (err, userInfo) => {
      if (err) {
        if (err.code === 401) {
          res.status(401).json(err.message);
        } else {
          res.status(500).send();
        }
      } else {
        try {
          req.session.user = {
            user_id: userInfo.user_id,
            full_name: userInfo.full_name,
            category: userInfo.category,
          };
          res.status(200).send();
        } catch (err) {
          res.status(500).send();
        }
      }
    });
  }

  async logout(req, res) {
    try {
      console.log(req.body);
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
      res.status(200).json({ user: { category: "guest" } });
    }
  }
}

module.exports = new AuthController();
