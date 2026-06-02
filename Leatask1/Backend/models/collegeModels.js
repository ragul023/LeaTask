const DataBase = require("../config/DataBase");

async function getCollegeDetails(collegeCode) {
  const [rows] = await DataBase.query(
    `
    SELECT *
    FROM collegedetails
    WHERE college_code = ?
    ORDER BY id
    `,
    [collegeCode]
  );

  return rows;
}

module.exports = getCollegeDetails;