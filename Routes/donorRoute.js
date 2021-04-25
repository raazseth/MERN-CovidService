const express = require("express");
const {
  addDonor,
  getDonor,
  addPatient,
  getPatient,
} = require("../Controllers/donorController");
const { requireSignin } = require("../Middleware");
const router = express.Router();

router.post("/addDonor", requireSignin, addDonor);
router.get("/getDonor", getDonor);

router.post("/addPatient", requireSignin, addPatient);
router.get("/getPatient", getPatient);

module.exports = router;
