const db = require("../config/Database");

const createForm = async (fields) => {

  // Find latest submission_id
  const [rows] = await db.query(
    `
    SELECT MAX(submission_id)
    AS latestId

    FROM form_fields
    `
  );

  let submissionId = 1;

  if (rows[0].latestId) {

    submissionId =
      rows[0].latestId + 1;

  }

  // Insert fields
  for (const field of fields) {

    await db.query(
      `
      INSERT INTO form_fields
      (
        submission_id,
        field_name,
        field_label,
        field_value
      )

      VALUES (?, ?, ?, ?)
      `,
      [
        submissionId,

        field.field_name,

        field.label,

        field.value
      ]
    );

  }

  return submissionId;
};

module.exports = {
  createForm
};