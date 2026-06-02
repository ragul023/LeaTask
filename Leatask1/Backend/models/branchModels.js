const DataBase = require("../config/DataBase");

async function getBranchDetails(collegeCode) {
  const [rows] = await DataBase.query(
    `
    SELECT *
    FROM branchdetails
    WHERE college_code = ?
    ORDER BY id
    `,
    [collegeCode]
  );

  return rows;
}

module.exports = getBranchDetails;