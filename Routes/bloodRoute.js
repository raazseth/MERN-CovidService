const express = require("express");
const { addBlood, getBlood } = require("../Controllers/bloodController");

const router = express.Router();

router.post("/addBlood", addBlood);
router.get("/getBlood", getBlood);

module.exports = router;
