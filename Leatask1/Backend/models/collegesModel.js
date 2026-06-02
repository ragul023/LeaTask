const DataBase = require("../config/DataBase");


const getCollegeByCode = async (collegeCode) => {
  const [college_name] = await DataBase.query(
    `
    SELECT college_name
    FROM colleges
    WHERE college_code = ?
    `,
    [collegeCode]
  );

  return college_name;
};

module.exports = {
  getCollegeByCode
};