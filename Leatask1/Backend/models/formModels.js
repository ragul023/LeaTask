const db = require("../config/DataBase");

const saveForm = async (forms) => {

const collegeCode = forms.code[1].value;
const collegeName = forms.code[0].value; 
await db.query(
  `INSERT INTO colleges (college_code, college_name)
   VALUES (?, ?)`,
  [collegeCode, collegeName]
);
await db.query(
  `INSERT INTO colleges (college_code, college_name)
   VALUES (?, ?)
   ON DUPLICATE KEY UPDATE
   college_name = VALUES(college_name)`,
  [collegeCode, collegeName]
);
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

  // Bank Details
  for(const field of forms.bank){
    await db.query(
      `INSERT INTO bankdetails
      (college_code ,field_lable ,field_value )
      VALUES(?,?,?)
      `,
      [collegeCode,field.label,field.value]
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