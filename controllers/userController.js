const catchAsync = require("../utils/catchAsync");
const User = require("./../models/userModel");

exports.getAllUsers = catchAsync(async function (req, res, next) {
  console.log("Getting all users");

  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});
