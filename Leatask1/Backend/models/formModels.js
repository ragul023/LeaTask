const db = require("../Config/DataBase");

const saveForm = async (data) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const collegeCode = 5467

    await connection.query(
      `INSERT INTO colleges
      (college_code,college_name)
      VALUES (?,?)`,
      [
        collegeCode,
        "College"
      ]
    );

    // COLLEGE DETAILS
    for (const item of data.college) {
      await connection.query(
        `INSERT INTO collegedetails
        (college_code,field_lable,field_value)
        VALUES (?,?,?)`,
        [
          collegeCode,
          item.label,
          item.value
        ]
      );
    }

    // HOSTEL DETAILS
    for (const item of data.hostel) {

      if (
        item.boys !== undefined ||
        item.girls !== undefined
      ) {
        await connection.query(
          `INSERT INTO hosteldetails
          (college_code,field_lable,boys_value,girls_value)
          VALUES (?,?,?,?)`,
          [
            collegeCode,
            item.label,
            item.boys,
            item.girls
          ]
        );
      } else {
        await connection.query(
          `INSERT INTO hosteldetails
          (college_code,field_lable,single_value)
          VALUES (?,?,?)`,
          [
            collegeCode,
            item.label,
            item.value
          ]
        );
      }
    }

    // BANK DETAILS
    for (const item of data.bank) {
      await connection.query(
        `INSERT INTO bankdetails
        (college_code,field_lable,field_value)
        VALUES (?,?,?)`,
        [
          collegeCode,
          item.label,
          item.value
        ]
      );
    }

    // BRANCH DETAILS
    for (const item of data.department) {
      await connection.query(
        `INSERT INTO branchdetails
        (
          college_code,
          branch_code,
          approved_intake,
          course_start_year,
          nba_accredited,
          valid_year
        )
        VALUES (?,?,?,?,?,?)`,
        [
          collegeCode,
          item.branch_code,
          item.approved_intake || null,
          item.course_start_year || null,
          item.nba_accredited || null,
          item.valid_year || null
        ]
      );
    }

    await connection.commit();

    return {
      success: true,
      message: "Saved Successfully"
    };

  } catch (error) {

    await connection.rollback();
    throw error;

  } finally {
    connection.release();
  }
};

module.exports = {
  saveForm
};