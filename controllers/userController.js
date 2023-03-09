const cloudinary = require("cloudinary");

const catchAsync = require("../utils/catchAsync");
const User = require("./../models/userModel");
const Place = require("./../models/placeModel");
const Comment = require("./../models/commentModel");
const WallPost = require("./../models/wallPostModel");
const AppError = require("../utils/AppError");

// Configuration of image cloud service
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.getUser = catchAsync(async function (req, res, next) {
  const username = req.params.username;

  if (username === "admin") return next(new AppError("User not found", 404));

  const user = await User.findOne({ username });

  if (!user) return next(new AppError("User not found", 404));

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

exports.getAllUsers = catchAsync(async function (req, res, next) {
  const users = await User.find({ role: { $ne: "admin" } });

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.updateUser = catchAsync(async function (req, res, next) {
  const { mapLanguage, mapType } = req.body;

  if (!mapLanguage && !mapType) {
    return next(new AppError("Update User Error", 400));
  }

  let updateObject;

  if (mapType) updateObject = { "settings.mapType": mapType };
  if (mapLanguage) updateObject = { "settings.language": mapLanguage };

  const updatedUser = await User.findOneAndUpdate(
    { username: req.params.username },
    updateObject,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedUser) return next(new AppError("Not found user to update", 404));

  return res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteUser = catchAsync(async function (req, res, next) {
  if (req.currentUser.role !== "admin" && !req.body.password) {
    return next(new AppError("Please, provide a password", 400));
  }

  const user = await User.findOne({
    username: req.params.username,
  }).select("+password");

  if (!user) return next(new AppError("Deleting user error", 400));

  if (
    req.currentUser.role !== "admin" &&
    !(await user.correctPassword(req.body.password))
  )
    return next(new AppError("Wrong password", 403));

  const deletedUser = await User.findOneAndDelete({
    username: req.params.username,
  });

  if (!deletedUser) {
    return next(new AppError("Deleting user error", 400));
  }

  // Delete all photos of deleted user from image cloud
  const placesToDelete = await Place.find({ user: deletedUser.id });

  placesToDelete.forEach(async (place) => {
    // Delete image on cloudinary
    cloudinary.v2.uploader.destroy(
      `travelmap/${place.photoCloudName}`,
      { type: "authenticated" },
      function (error, result) {
        if (error || result.result !== "ok") {
          // Just print to console error with deleting image from cloud
          console.log("💥💥 Deleting image from cloud error");
          if (error) console.log(error);
          if (result.result !== "ok") console.log(result);
        }
      }
    );

    // Delete small image on cloudinary
    cloudinary.v2.uploader.destroy(
      `travelmap/${place.photoCloudName}-small`,
      { type: "authenticated" },
      function (error, result) {
        if (error || result.result !== "ok") {
          // Just print to console error with deleting image from cloud
          console.log("💥💥 Deleting image from cloud error");
          if (error) console.log(error);
          if (result.result !== "ok") console.log(result);
        }
      }
    );

    // Delete place related comments
    await Comment.deleteMany({ place: place._id });
  });

  // Delete all places of deleted user
  await Place.deleteMany({ user: deletedUser.id });

  // Delete all wallposts related to deleted user
  await WallPost.deleteMany({
    $or: [{ sourceUser: deletedUser.id }, { targetUser: deletedUser.id }],
  });

  // Delete deleted users's likes
  await Place.updateMany(
    { likes: deletedUser.id },
    {
      $pull: {
        likes: deletedUser.id,
      },
    }
  );

  res.clearCookie("jwt");

  res.status(204).json({
    status: "success",
  });
});

exports.searchByName = catchAsync(async (req, res, next) => {
  const { searchString } = req.body;

  const regex = new RegExp(searchString, "i"); // i for case insensitive

  const users = await User.find({
    username: { $regex: regex },
    role: { $ne: "admin" },
  });

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

exports.generatePhoto = catchAsync(async (req, res, next) => {
  const response = await fetch(process.env.RANDOM_IMAGE_URL);

  if (!response.ok) {
    console.log("Unable to get random photo");

    return res.status(200).json({
      status: "error",
      message: "Unable to get random photo",
    });
  }

  const { url } = await response.json();

  console.log(url);

  res.status(200).json({
    status: "success",
    data: {
      photo: url,
    },
  });
});
