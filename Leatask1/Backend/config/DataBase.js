const mysql = require("mysql2/promise");
require("dotenv").config();

const DataBase = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

(async () => {
  try {
    const connection = await DataBase.getConnection();

    console.log(" MySQL Connected");

    connection.release();
  } catch (error) {
    console.log(" Database Error");
    console.log(error.message);
  }
})();

module.exports = DataBase;