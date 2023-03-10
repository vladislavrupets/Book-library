const pgPool = require("./dbConfig");

class UserServise {
  async getUsers(category, callback) {
    try {
      const data = await pgPool(category).query("select * from Users");
      callback(null, data.rows);
    } catch (err) {
      console.error(err);
      const customError = new Error();
      customError.code(500);
      callback(customError);
    }
  }

  async getUserByData(user, callback) {
    try {
      const data = await pgPool(user.category).query(
        `select * from Users where Users.login = $1 and Users.password = $2`,
        [user.login, user.password]
      );

      if (data.rowCount === 0) {
        customError = new Error("Invalid username or password");
        customError.code(401);
        throw customError;
      }
      callback(null, data.rows[0]);
    } catch (err) {
      if (err.code === 401) {
        callback(err);
      } else {
        console.error(err);
        const customError = new Error();
        customError.code(500);
        callback(customError);
      }
    }
  }

  async createUser(user, callback) {
    try {
      const data = await pgPool(user.category).query(
        `insert into Users
            (full_name, phone_number, login, password, trust_rating) 
            values ($1, $2, $3, $4, $5)
            returning *`,
        [
          user.fullName,
          user.phoneNumber,
          user.login,
          user.password,
          user.trustRaiting,
        ]
      );
      callback(null, data.rows[0]);
    } catch (err) {
      const customError = new Error();
      if (err.code === "23505") {
        customError.code = 400;
        if (err.constraint === "users_login_key") {
          customError.message = "User with the same login already exists";
        } else if (err.constraint === "users_phone_number_key") {
          customError.message =
            "User with the same phone number already exists";
        }
      } else {
        console.error(err);
        customError.code = 500;
      }
      callback(customError);
    }
  }

  async deleteUser(user, callback) {
    try {
      await pgPool(user.category).query(
        `delete from users where user_id = $1`,
        [user.user_id]
      );
    } catch (err) {
      console.error(err);
      const customError = new Error();
      customError.code = 500;
      callback(customError);
    }
  }
}

module.exports = new UserServise();
