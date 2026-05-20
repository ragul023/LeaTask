const mysql = require("mysql2/promise");

// DB Pool
const DataBase = mysql.createPool({
    host: process.env.DB_Host,
    user: process.env.DB_User,
    password: process.env.DB_Password,
    database: process.env.DB_Name
});

// Test DB
(async () => {
    try {

        await DataBase.query("SELECT 1");

        console.log("DB Connected..");

    } catch (error) {

        console.log("DB Connection Fail....");
        console.log(error);

    }
})();

module.exports = DataBase;