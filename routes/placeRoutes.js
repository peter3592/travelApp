const express = require("express");

const placeController = require("./../controllers/placeController");
const authController = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(authController.onlyLoggedUser, placeController.getAllPlaces)
  .delete(authController.onlyLoggedUser, placeController.deletePlace)
  .post(
    authController.onlyLoggedUser,
    placeController.processFormData,
    placeController.checkValues,
    placeController.uploadPhoto,
    placeController.createPlace
  );

router
  .route("/get-country")
  .post(authController.onlyLoggedUser, placeController.getCountry);

router
  .route("/search-by-name")
  .post(authController.onlyLoggedUser, placeController.searchByName);

router
  .route("/top-places")
  .post(authController.onlyLoggedUser, placeController.getTopPlaces);

router
  .route("/:id/like")
  .patch(authController.onlyLoggedUser, placeController.likePlace);

router
  .route("/:id")
  .get(authController.onlyLoggedUser, placeController.getPlace)
  .patch(
    authController.onlyLoggedUser,
    authController.checkRestriction,
    placeController.updatePlace
  );

module.exports = router;
