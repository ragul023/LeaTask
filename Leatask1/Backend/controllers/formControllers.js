const formModel = require("../models/formModels");

const submitForm = async (req, res) => {
  try {
    await formModel.saveForm(req.body);

    res.status(200).json({
      success: true,
      message: "Form Submitted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  submitForm,
};