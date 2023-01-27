const catchAsync = require("../utils/catchAsync");
const Comment = require("./../models/commentModel");
const Place = require("./../models/placeModel");
const AppError = require("../utils/AppError");
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
  );

  const otherComments = await Comment.find({
    author: req.currentUser._id,
    place: updatedPlace._id,
  });

  // Create wall post only on first comment and not when user
  // comment his own place
  if (
    // !req.currentUser._id.equals(updatedPlace.user._id) &&
    otherComments.length === 1
  )
    createWallPost({
      type: "comment",
      place: req.body.placeId,
      sourceUser: req.currentUser._id,
      targetUser: updatedPlace.user._id,
      next,
    });

  res.status(200).json({
    status: "success",
    data: { comment: newComment },
  });
});

exports.deleteComment = catchAsync(async function (req, res, next) {
  const commentId = req.params.id;

  const deletedComment = await Comment.findOneAndDelete({
    _id: commentId,
    // author: req.currentUser,
  });

  console.log("Deleted comment", deletedComment);

  if (!deletedComment) return next(new AppError("Deleting comment error", 500));

  const otherComments = await Comment.find({
    author: req.currentUser._id,
    place: deletedComment.place._id,
  });

  // Delete wall post when there is no more comments on this place
  if (otherComments.length === 0)
    deleteWallPost({
      type: "comment",
      place: deletedComment.place._id,
      sourceUser: req.currentUser._id,
      // targetUser: updatedPlace.user._id,
      next,
    });

  res.status(204).json({
    status: "success",
  });
});
