const mysql = require("mysql2");

//DB connection 
const DataBase = mysql.createConnection({
    host: process.env.DB_Host,
    user: process.env.DB_User,
    password: process.env.DB_Password,
    database: process.env.DB_Name
});

DataBase.connect((error)=>{
    if(error){
        console.log("DB Connection Fail....");
        console.log(error)
    } else{
        console.log("DB Connected..");
    }
});

module.exports = DataBase;