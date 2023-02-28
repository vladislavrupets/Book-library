const Pool = require("pg").Pool;

module.exports = function adaptivePool(userRole = "guest") {
  const pool = new Pool({
    user: `${userRole}`,
    password: process.env[`${userRole}_pass`],
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  });
};
