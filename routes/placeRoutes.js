const express = require("express");

const placeController = require("./../controllers/placeController");
const authController = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(authController.onlyLoggedUser, placeController.getAllPlaces)
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
  .get(authController.onlyLoggedUser, placeController.getTopPlaces);

router
  .route("/recent-places")
  .get(authController.onlyLoggedUser, placeController.getRecentPlaces);

router
  .route("/reload-data")
  .get(authController.onlyLoggedUser, placeController.reloadData);

router
  .route("/compress")
  .get(authController.onlyLoggedUser, placeController.compress);

router
  .route("/get-coordinates")
  .post(authController.onlyLoggedUser, placeController.getCoordinates);

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
  )
  .delete(
    authController.onlyLoggedUser,
    authController.checkRestriction,
    placeController.deletePlace
  );

module.exports = router;
