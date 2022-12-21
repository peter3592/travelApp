const express = require("express");

const placeController = require("./../controllers/placeController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.route("/").post(placeController.createPlace);

module.exports = router;
