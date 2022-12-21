const express = require("express");

const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.route("/").get(userController.getAllUsers);

router.post("/login", authController.login);
router.get("/logout", authController.protect, authController.logout);
router.post("/signup", authController.signup);

module.exports = router;
