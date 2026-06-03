const formModel = require("../models/formModels");

const submitForm = async (req, res) => {
  try {

    const result =
      await formModel.saveForm(req.body);
      console.log(result)

   return res.status(200).json(result);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  submitForm
};