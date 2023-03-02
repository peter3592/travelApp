const cloudinary = require("cloudinary");
const multer = require("multer");
const sharp = require("sharp");

const catchAsync = require("../utils/catchAsync");
const Place = require("./../models/placeModel");
const User = require("./../models/userModel");
const AppError = require("../utils/AppError");
const countryCodes = require("./../utils/countryCodes");
const {
  createWallPost,
  deleteWallPost,
} = require("./../utils/handleWallPosts");
const WallPost = require("../models/wallPostModel");
const Comment = require("../models/commentModel");

// Configuration of image cloud service
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Processing Form Data
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) return cb(null, true); // true = file type is image

  cb(new AppError("Only images are allowed to upload", 400), false); // false = file type is not image
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: multerFilter,
});

exports.processFormData = upload.single("photo"); // this middleware creates req.file property
// "photo" is field name of sended Form Data formular

exports.checkValues = async (req, res, next) => {
  const { name, latitude, longitude } = req.body;

  console.log("bodko", req.body);

  if (!name) return next(new AppError("Missing place name", 400));

  if (!latitude || !longitude)
    return next(new AppError("Missing coordinates", 400));

  // if (!latitude && latitude !== 0)
  //   return next(new AppError("Please, provide a latitude", 400));
  // if (!longitude && longitude !== 0)
  //   return next(new AppError("Please, provide a longitude", 400));

  // Check if there is no place with same latitude and longitude
  const place = await Place.findOne({
    user: req.currentUser,
    "location.coordinates": [longitude, latitude],
  });

  if (place)
    return next(
      new AppError("Place with same coordinates already exists", 400)
    );

  const countryCode = await getCountryCode(latitude, longitude);

  if (!countryCode)
    return res.status(400).json({
      status: "fail",
      message: "Unable to find country with this coordinates",
    });

  req.countryCode = countryCode;

  next();
};

const deleteImage = (photoCloudName) => {
  // after uploading photo, something went wrong
  // in saving new place in db, so delete photo
  cloudinary.v2.uploader.destroy(
    `travelmap/${photoCloudName}`,
    { type: "authenticated" },
    function (error, result) {
      if (error || result.result !== "ok") {
        // Just print to console error with deleting image from cloud
        console.log("💥💥Deleting image from cloud error");
        if (error) console.log(error);
        if (result.result !== "ok") console.log(result);
      }
    }
  );
};

const compressImage = async (originalBuffer, maxKbSize) => {
  let compressedBuffer = originalBuffer;
  let quality = 80;

  while (compressedBuffer.byteLength > maxKbSize * 1024 && quality > 0) {
    compressedBuffer = await sharp(originalBuffer)
      .toFormat("jpeg")
      .jpeg({ quality })
      .toBuffer();

    //quality -= 7;
    quality -= 10;

    console.log(
      "Quality:",
      quality,
      "%, Size:",
      compressedBuffer.byteLength,
      "kb"
    );
  }

  return compressedBuffer;
};

exports.uploadPhoto = catchAsync(async (req, res, next) => {
  // If there is no file, continue to next middlewares
  // req.file property is added by upload.single middleware

  // if (!req.file) {
  //   // return next(new AppError("Please, provide an image", 400));
  //   return next();
  // }

  const userId = req.currentUser._id;
  const timestamp = Date.now();

  if (!req.file) return next(new AppError("Please, provide an image", 400));

  // We need filename property in next middleware
  req.file.filename = `user-${userId}-${timestamp}`;

  // const compressedBuffer = await compressImage(req.file.buffer, 1024);
  const compressedBuffer = req.file.buffer;

  const stream = await sharp(compressedBuffer) // we stored image in memory
    .toFormat("jpeg") // convert all images to jpeg
    .rotate()
    // .withMetadata({ orientation: 6 })
    .toBuffer();

  cloudinary.v2.uploader
    .upload_stream(
      {
        resource_type: "image",
        public_id: req.file.filename,
        folder: "travelmap",
        sign_url: true,
        type: "authenticated",
      },
      function (error, result) {
        if (error) {
          return next(new AppError("Upload image error", 500));
        }

        req.body.photoUrl = result.secure_url;
        next();
      }
    )
    .end(stream);
});

const getCountryCode = async function (lat, lng) {
  try {
    const response = await fetch(
      `https://api.geocod.io/v1.7/reverse?api_key=${process.env.GEOCODIO_API_KEY}&q=${lat},${lng}`
    );

    const resData = await response.json();

    if (resData.results.length > 0)
      return resData.results[0].address_components.country.toLowerCase();

    // Not supported states. Get state from error message (fe: 'SK is not currently a Geocodio-supported country)
    const countryCode = resData._warnings[0].slice(0, 2).toLowerCase();
    // Fix bug countries
    if (countryCode === "-9" && lat < 51.2) return "fr"; // France
    if (countryCode === "-9" && lat > 57.9) return "no"; // Norway

    return countryCode;
  } catch (err) {
    // Fix Canada bug
    if (lat > 51 && lat < 80 && lng > -140.995 && lng < -52.4) return "ca";

    return null;
  }
};

exports.getPlace = catchAsync(async function (req, res, next) {
  const place = await Place.findById(req.params.id).populate("comments");

  if (!place) return next(new AppError("Place not found", 404));

  res.status(200).json({
    status: "success",
    data: {
      place,
    },
  });
});

exports.getAllPlaces = catchAsync(async function (req, res, next) {
  const places = await Place.find().populate("comments");
  // .select("comments.author");

  res.status(200).json({
    status: "success",
    results: places.length,
    data: {
      places,
    },
  });
});

exports.getUserPlaces = catchAsync(async function (req, res, next) {
  const filter = {};

  const user = await User.findOne({ username: req.params.username });

  filter.user = user._id;

  if (req.query.lat && req.query.lng)
    filter["location.coordinates"] = [req.query.lng, req.query.lat];

  const places = await Place.find(filter).populate("comments");

  res.status(200).json({
    status: "success",
    results: places.length,
    data: {
      places,
    },
  });
});

exports.createPlace = catchAsync(async function (req, res, next) {
  if (process.env.NODE_ENV === "development") {
    // console.log(newPlace);
    // console.log("Current User:", req.currentUser);
  }

  const { name, latitude, longitude, photoUrl, description } = req.body;
  const photoCloudName = req.file.filename;

  // const countryCode = await getCountryCode(latitude, longitude);

  const countryFlag = process.env.FLAG_URL.replace(
    "countryCode",
    req.countryCode
  );

  const countryName =
    req.countryCode === "us"
      ? "United States of America"
      : JSON.parse(countryCodes.codes)[req.countryCode];

  try {
    const newPlace = await Place.create({
      name,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      "country.name": countryName,
      "country.flagUrl": countryFlag,
      "country.code": req.countryCode,
      photoCloudName,
      photoUrl,
      description,
      user: req.currentUser._id,
    });

    const creatingOk = await createWallPost({
      type: "newPlace",
      place: newPlace._id,
      sourceUser: req.currentUser._id,
    });

    if (!creatingOk) {
      deleteImage(photoCloudName);
      return next(new AppError("Creating like wall post error", 404));
    }

    res.status(201).json({
      status: "success",
      data: {
        place: newPlace,
      },
    });
  } catch (err) {
    console.log("Deleting image ...");
    deleteImage(photoCloudName);
    // console.log(err.message);
    // return next(new AppError("XXXX", 400));
    throw err;
  }
});

exports.deletePlace = catchAsync(async (req, res, next) => {
  const idToDelete = req.params.id;

  if (!idToDelete)
    return next(new AppError("No id provided for deleting place", 500));

  const deletedPlace = await Place.findOneAndDelete({
    _id: idToDelete,
  });

  if (!deletedPlace) {
    return next(new AppError("Deleting place error", 500));
  }

  // Delete place image from image cloud
  deleteImage(deletedPlace.photoCloudName);

  // Delete wall posts
  await WallPost.deleteMany({ place: deletedPlace._id });

  // Delete Comments
  await Comment.deleteMany({ place: deletedPlace._id });

  await res.status(204).json({
    status: "success",
  });
});

exports.likePlace = catchAsync(async (req, res, next) => {
  const placeId = req.params.id;

  const place = await Place.findById(placeId);

  if (!place) return next(new AppError("Place not found", 404));

  let likeAction;

  if (place.likes.includes(req.currentUser._id)) {
    // Remove like
    likeAction = {
      $pullAll: {
        likes: [req.currentUser._id],
      },
    };

    // Remove wall post about like
    const deletingOk = await deleteWallPost({
      type: "like",
      sourceUser: req.currentUser._id,
      place: placeId,
    });

    if (!deletingOk)
      return next(new AppError("Deleting like wall post error", 404));
    // }
  } else {
    // Add like
    likeAction = {
      $push: {
        likes: req.currentUser._id,
      },
    };

    // Not create wall post when user like his own place
    // if (!req.currentUser._id.equals(place.user._id)) {
    const creatingOk = await createWallPost({
      type: "like",
      place: placeId,
      sourceUser: req.currentUser._id,
      targetUser: place.user._id,
    });

    if (!creatingOk)
      return next(new AppError("Creating like wall post error", 404));
    // }
  }

  const updatedPlace = await Place.findOneAndUpdate(
    { _id: placeId },
    likeAction,
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(200).json({
    status: "success",
    data: {
      place: updatedPlace,
    },
  });
});

exports.updatePlace = catchAsync(async (req, res, next) => {
  const updateData = {};

  if (req.body.name) updateData.name = req.body.name;
  if (req.body.description) updateData.description = req.body.description;

  if (Object.keys(updateData).length === 0)
    return next(new AppError("No new place name or description provided", 500));

  const updatedPlace = await Place.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      ...updateData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(200).json({
    status: "success",
    data: {
      place: updatedPlace,
    },
  });
});

const getCountryData = async (latitude, longitude, next) => {
  if (!latitude && latitude !== 0)
    return next(new AppError("Please, provide a latitude", 400));
  if (!longitude && longitude !== 0)
    return next(new AppError("Please, provide a longitude", 400));

  const countryCode = await getCountryCode(latitude, longitude);

  if (!countryCode)
    return next(
      new AppError("Unable to find country with this coordinates", 400)
    );

  const countryName =
    countryCode === "us"
      ? "United States of America"
      : JSON.parse(countryCodes.codes)[countryCode];

  if (!countryName)
    return next(new AppError("Unable to find country name", 400));

  const flagUrl = process.env.FLAG_URL.replace("countryCode", countryCode);

  return [countryName, flagUrl];
};

exports.getCountry = catchAsync(async (req, res, next) => {
  const { latitude, longitude } = req.body;

  const [countryName, flagUrl] = await getCountryData(
    latitude,
    longitude,
    next
  );

  res.status(200).json({
    status: "success",
    data: {
      countryName,
      flagUrl,
    },
  });
});

exports.searchByName = catchAsync(async (req, res, next) => {
  const { searchString } = req.body;

  const regex = new RegExp(searchString, "i"); // i for case insensitive

  const places = await Place.find({
    name: { $regex: regex },
  }).populate("comments");

  res.status(200).json({
    status: "success",
    data: {
      places,
    },
  });
});

exports.getTopPlaces = catchAsync(async function (req, res, next) {
  // const { username } = req.body;

  let topPlaces = await Place.aggregate([
    { $addFields: { num_likes: { $size: { $ifNull: ["$likes", []] } } } },
    { $sort: { num_likes: -1 } },
  ]);
  // let topPlaces = await Place.aggregate([
  //   { $addFields: { num_likes: { $size: "$likes" } } },
  //   { $sort: { num_likes: -1 } },
  // ]);

  topPlaces = await Place.populate(topPlaces, { path: "comments" });

  topPlaces = await Place.populate(topPlaces, { path: "user" });

  const topThreePlaces = topPlaces
    // .filter((place) => (username ? place.user.username === username : true))
    .filter((place) => place.num_likes > 0)
    .slice(0, 3);

  res.status(200).json({
    status: "success",
    data: {
      topPlaces: topThreePlaces,
    },
  });
});

exports.getRecentPlaces = catchAsync(async function (req, res, next) {
  const recentPlaces = await Place.find()
    .populate("comments")
    .sort({ createdAt: -1 })
    .limit(3);
  // .populate("comments");

  res.status(200).json({
    status: "success",
    data: {
      recentPlaces,
    },
  });
});

exports.reloadData = catchAsync(async function (req, res, next) {
  // GET TOP PLACES
  let topPlaces = await Place.aggregate([
    { $addFields: { num_likes: { $size: { $ifNull: ["$likes", []] } } } },
    { $sort: { num_likes: -1 } },
  ]);
  // let topPlaces = await Place.aggregate([
  //   { $addFields: { num_likes: { $size: "$likes" } } },
  //   { $sort: { num_likes: -1 } },
  // ]);

  topPlaces = await Place.populate(topPlaces, { path: "comments" });

  topPlaces = await Place.populate(topPlaces, { path: "user" });

  const topThreePlaces = topPlaces
    // .filter((place) => (username ? place.user.username === username : true))
    .filter((place) => place.num_likes > 0)
    .slice(0, 3);

  // GET RECENT PLACES
  const recentPlaces = await Place.find()
    .populate("comments")
    .sort({ createdAt: -1 })
    .limit(3);
  // .populate("comments");

  // GET WALLPOSTS
  const wallPosts = await WallPost.find();

  res.status(200).json({
    status: "success",
    data: {
      topPlaces: topThreePlaces,
      recentPlaces,
      wallPosts,
    },
  });
});
