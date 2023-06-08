const pgPool = require("./dbConfig");

class UserService {
  async getUsers(category) {
    try {
      const usersData = await pgPool(category).query("select * from Users");
      return usersData.rows;
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }

  async getUserById(user_id, category) {
    try {
      const userData = await pgPool(category).query(
        "select * from Users where user_id = $1",

        [user_id]
      );
      return userData.rows[0];
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }

  async getUserByData(user, category) {
    try {
      const userData = await pgPool(category).query(
        `select * from Users where Users.login = $1 and Users.password = $2`,
        [user.login, user.password]
      );

      if (userData.rowCount === 0) {
        throw { code: 401, message: "Invalid username or password" };
      }
      return userData.rows[0];
    } catch (err) {
      if (err.code === 401) {
        throw err;
      } else {
        console.error(err);
        throw { code: 500 };
      }
    }
  }

  async createUser(user, category) {
    try {
      const userData = await pgPool(category).query(
        `insert into Users
          (full_name, phone_number, login, password, trust_rating) 
          values ($1, $2, $3, $4, $5)
          returning *`,
        [
          user.fullName,
          user.phoneNumber,
          user.login,
          user.password,
          user.trustRating,
        ]
      );
      return userData.rows[0];
    } catch (err) {
      if (err.code === "23505") {
        if (err.constraint === "users_login_key") {
          throw {
            code: 400,
            message: "User with the same login already exists",
          };
        } else if (err.constraint === "users_phone_number_key") {
          throw {
            code: 400,
            message: "User with the same phone number already exists",
          };
        }
      } else {
        console.error(err);
        throw { code: 500 };
      }
    }
  }

  async deleteUser(user, category) {
    try {
      await pgPool(category).query("delete from users where user_id = $1", [
        user.user_id,
      ]);
    } catch (err) {
      console.error(err);
      throw { code: 500 };
    }
  }
}

module.exports = new UserService();
