const express = require("express");

const commentController = require("./../controllers/commentController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.onlyLoggedUser, commentController.getAllComments)
  .post(authController.onlyLoggedUser, commentController.postComment);

router
  .route("/:id")
  .delete(
    authController.onlyLoggedUser,
    authController.checkRestriction,
    commentController.deleteComment
  );

module.exports = router;
