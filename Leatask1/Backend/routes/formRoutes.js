const express = require("express");

const router = express.Router();

//use controllers/formControllers
const {SubmitForm,getforms} = require("../controllers/formControllers");

//POST
router.post("/submit",SubmitForm);
//GET
router.get("/",getforms);

module.exports = router;
