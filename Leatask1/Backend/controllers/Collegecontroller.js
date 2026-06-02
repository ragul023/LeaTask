const getCollegeDetails =require("../models/collegeModels.js");
const getHostelDetails =require("../models/hostelModels.js");
const getBranchDetails =require("../models/branchModels.js");
const generatePDF =require("../utils/generateCollegepdf.js");
const getBankDetails =require("../models/bankModels.js");
const {getCollegeByCode} = require("../models/collegesModel.js");

const downloadBooklet = async (req, res) => {
  try {
    const { collegeCode } = req.params;

    const college_name = await getCollegeByCode(collegeCode);

    const collegeDetails =
      await getCollegeDetails(collegeCode);

    const hostelDetails =
      await getHostelDetails(collegeCode);

    const bankdetails =
      await getBankDetails(collegeCode);

    const branchDetails =
      await getBranchDetails(collegeCode);

    generatePDF(
      res,
      college_name,
      collegeCode,
      collegeDetails,
      bankdetails,
      hostelDetails,
      branchDetails
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "PDF generation failed"
    });
  }
};

module.exports= downloadBooklet;