// import WallPost from "../models/wallPostModel";
const WallPost = require("./../models/wallPostModel");
const AppError = require("./AppError");
const catchAsync = require("./catchAsync");

module.exports.createWallPost = async (postBody) => {
  console.log("I am going to create wall post ...");

  const createdPost = await WallPost.create(postBody);

  console.log("createdPost", createdPost);

  if (!createdPost) return false;

  return true;
};

module.exports.deleteWallPost = async (filter) => {
  const res = await WallPost.deleteOne(filter);

  if (res.deletedCount === 0) return false;

  return true;
};
