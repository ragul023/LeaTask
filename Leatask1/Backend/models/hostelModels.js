const DataBase = require("../config/DataBase");
async function getHostelDetails(collegeCode) {
  const [rows] = await DataBase.query(
    `
    SELECT *
    FROM hosteldetails
    WHERE college_code = ?
    ORDER BY id
    `,
    [collegeCode]
  );

  return rows;
}

module.exports = getHostelDetails;