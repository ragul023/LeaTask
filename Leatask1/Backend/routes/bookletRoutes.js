const express= require("express");
const downloadBooklet = require("../controllers/collegeController.js");

const router = express.Router();

router.get(
  "/download/:collegeCode",
  downloadBooklet
);
 
module.exports = router; 