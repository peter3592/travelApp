const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const WallPost = require("../models/wallPostModel");
const User = require("../models/userModel");

exports.getWallPosts = catchAsync(async function (req, res) {
  const wallPostsQuery = WallPost.find().sort({ createdAt: -1 });

  const page = +req.query.page || 1;
  const pageLimit = +req.query.limit || 10;

  const wallPosts = await wallPostsQuery.limit(page * pageLimit);

  res.status(200).json({
    status: "success",
    results: wallPosts.length,
    data: {
      wallPosts,
    },
  });
});

exports.createWallPost = catchAsync(async function (req, res, next) {
  const { type, targetUser, place } = req.body;

  if (req.currentUser._id.equals(targetUser))
    return next(
      new AppError("Target user cannot be also the source user", 400)
    );

  if (!type) return next(new AppError("Wall post must have a type", 400));

  if (!place) return next(new AppError("Wall post must have a place", 400));

  if ((place === "like" || place === "comment") && !targetUser)
    return next(new AppError("Like or comment must have target user", 400));

  const targetUserDb = await User.findById(targetUser);

  if (!targetUserDb)
    return next(new AppError("Target user does not exists", 400));

  const newWallPost = await WallPost.create({
    type,
    sourceUser: req.currentUser._id,
    targetUser,
    place,
  });

  res.status(200).json({
    status: "success",
    data: { wallPost: newWallPost },
  });
});
