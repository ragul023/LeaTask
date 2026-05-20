const {
  createForm,
  getAllForms
} = require(
  "../models/formModels"
);

// SUBMIT FORM
const SubmitForm = async (
  req,
  res
) => {

  try {

    const fields = req.body;

    const submissionId =
      await createForm(fields);

    res.status(201).json({
      success: true,
      submissionId
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Form submission failed"
    });

  }
};

// GET FORMS
const getforms = async (
  req,
  res
) => {

  try {

    const forms =
      await getAllForms();

    res.json(forms);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false
    });

  }
};

module.exports = {
  SubmitForm,
  getforms
};