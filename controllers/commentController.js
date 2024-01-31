const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const Comment = require("./../models/commentModel");
const Place = require("./../models/placeModel");
const {
  createWallPost,
  deleteWallPost,
} = require("./../utils/handleWallPosts");

exports.getAllComments = catchAsync(async function (req, res, next) {
  const comments = await Comment.find();

  res.status(200).json({
    status: "success",
    results: comments.length,
    data: {
      comments,
    },
  });
});

exports.postComment = catchAsync(async function (req, res, next) {
  const newComment = await Comment.create({
    author: req.currentUser._id,
    place: req.body.placeId,
    text: req.body.text,
  });

  const updatedPlace = await Place.findByIdAndUpdate(
    { _id: req.body.placeId },
    { $push: { comments: newComment._id } },
    {
      new: true,
      runValidators: true,
    }
  ).populate("comments");

  const commentsCount = await Comment.find({
    author: req.currentUser._id,
    place: updatedPlace._id,
  });

  // Create wall post only on first comment and not when user
  // comment his own place
  if (commentsCount.length === 1)
    createWallPost({
      type: "comment",
      place: req.body.placeId,
      sourceUser: req.currentUser._id,
      targetUser: updatedPlace.user._id,
      next,
    });

  res.status(200).json({
    status: "success",
    data: { place: updatedPlace },
    // data: { comment: newComment },
  });
});

exports.deleteComment = catchAsync(async function (req, res, next) {
  const commentId = req.params.id;

  const deletedComment = await Comment.findOneAndDelete({
    _id: commentId,
  });

  const place = await Place.findOne({ comments: deletedComment._id });

  if (!deletedComment || !place)
    return next(new AppError("Deleting comment error", 500));

  const commentsCount = await Comment.find({
    author: req.currentUser._id,
    place: deletedComment.place._id,
  });

  // Delete wall post when there is no more comments on this place
  if (commentsCount.length === 0)
    deleteWallPost({
      type: "comment",
      place: deletedComment.place,
      sourceUser: deletedComment.author,
      next,
    });

  // Delete comment from user comments array
  place.comments.pull(deletedComment._id);
  await place.save();

  res.status(204).json({
    status: "success",
  });
});
