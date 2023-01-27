const express = require("express");

const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const placeController = require("./../controllers/placeController");

const router = express.Router();

router
  .route("/")
  .get(authController.onlyLoggedUser, userController.getAllUsers);

router.post("/login", authController.login);
router.get("/logout", authController.onlyLoggedUser, authController.logout);
router.post("/signup", authController.signup);
router.get("/refresh", authController.refresh);
router.get("/generate-photo", userController.generatePhoto);

router
  .route("/search-by-name")
  .post(authController.onlyLoggedUser, userController.searchByName);

router
  .route("/:username")
  .get(authController.onlyLoggedUser, userController.getUser)
  .patch(
    authController.onlyLoggedUser,
    authController.checkRestriction,
    userController.updateUser
  )
  .delete(
    authController.onlyLoggedUser,
    authController.checkRestriction,
    userController.deleteUser
  );

router
  .route("/:username/places")
  .get(authController.onlyLoggedUser, placeController.getUserPlaces);

module.exports = router;
