const DataBase = require("../config/DataBase");

//Insert form data to the table
const createForm = (field,callback) =>{
    const query =`
        insert into forms
        (field_name , label_name, field_value)
        values(?,?,?)
    `;
    DataBase.query(query,
        [
            field.field_name,
            field.label,
            field.value,
        ],
        callback
    );
};

//Get the form data to the table
const GetForm = (callback)=>{
    const query = "select * form forms";
    DataBase.query(query,callback);
};

module.exports = {
    createForm,
    GetForm
};