const express = require("express");

const router = express.Router();

//use controllers/formControllers
const {SubmitForm,getforms} = require("../controllers/formControllers");

//POST
router.post("/",SubmitForm);
//GET
router.get("/",getforms);

module.exports = router;
