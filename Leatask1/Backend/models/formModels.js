const db = require("../config/DataBase");

const saveForm = async (forms) => {
  const collegeCode = Date.now();

  // Save College Details
  for (const field of forms.college) {
    await db.query(
      `INSERT INTO collegedetails
      (college_code, field_lable, field_value)
      VALUES (?, ?, ?)`,
      [collegeCode, field.label, field.value]
    );
  }

  // Save Hostel Details
  for (const field of forms.hostel) {
    await db.query(
      `INSERT INTO hosteldetails
      (college_code, field_lable, single_value)
      VALUES (?, ?, ?)`,
      [collegeCode, field.label, field.value]
    );
  }

  // Save Department Details
  for (const field of forms.department) {
    await db.query(
      `INSERT INTO branchdetails
      (college_code, branch_code, approved_intake)
      VALUES (?, ?, ?)`,
      [collegeCode, field.value, 0]
    );
  }

  return true;
};

module.exports = {
  saveForm,
};