const express = require("express");

const router = express.Router();

const authController = require("./../controllers/authController");
const wallPostController = require("./../controllers/wallPostController");

router
  .route("/")
  .get(authController.onlyLoggedUser, wallPostController.getWallPosts)
  .post(authController.onlyLoggedUser, wallPostController.createWallPost);

module.exports = router;
