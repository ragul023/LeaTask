const DataBase = require("../config/DataBase");

async function getBankDetails(collegeCode) {
  const [rows] = await DataBase.query(
    `
    SELECT *
    FROM bankdetails
    WHERE college_code = ?
    ORDER BY id
    `,
    [collegeCode]
  );

  return rows;
}

module.exports = getBankDetails;