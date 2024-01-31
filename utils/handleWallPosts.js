const WallPost = require("./../models/wallPostModel");

module.exports.createWallPost = async (postBody) => {
  const createdPost = await WallPost.create(postBody);

  if (!createdPost) return false;

  return true;
};

module.exports.deleteWallPost = async (filter) => {
  const res = await WallPost.deleteOne(filter);

  if (res.deletedCount === 0) return false;

  return true;
};
