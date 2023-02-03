const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");

const User = require("./../models/userModel");
const Place = require("./../models/placeModel");
const AppError = require("./../utils/AppError");

const createSendToken = (user, statusCode, req, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 1000 * 60 * 60 * 24
    ),
    // httpOnly: true, // cookie can't be modified by browser
    // secure: false,
  };

  if (req.secure) cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output when creating user
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// Protecting the protected routes
module.exports.onlyLoggedUser = catchAsync(async (req, res, next) => {
  // 1) Getting token from cookies
  const token = req.cookies?.jwt;

  // console.log("Only loggogning user");
  // console.log("token:", token);

  if (!token)
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );

  // 2) Verification token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  // 3) Check if user still exists
  if (!currentUser) return next(new AppError("The user does not exist", 401));

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat))
    return next(
      new AppError("User recently changed password! Please log in again", 401)
    );

  // 5) Pass current user to following middlewares.
  req.currentUser = currentUser;

  next();
});

module.exports.checkRestriction = async (req, res, next) => {
  const { id: placeId, username } = req.params;

  if (!placeId && !username) return next();

  // Places
  if (req.baseUrl.includes("places")) {
    const place = await Place.findById(placeId);

    if (place.user._id.toString() !== req.currentUser._id.toString())
      return next(new AppError("You are not owner of this resource", 401));
  }

  // Users
  if (req.baseUrl.includes("users") && username !== req.currentUser.username)
    return next(new AppError("You are not owner of this resource", 401));

  next();
};

module.exports.login = catchAsync(async (req, res, next) => {
  const { usernameEmail, password } = req.body;

  // 1) Check if email and password exists
  if (!usernameEmail) {
    return next(new AppError("Please, provide a username or email", 400));
  }
  if (!password) {
    return next(new AppError("Please, provide a password", 400));
  }

  // 2) Check if user existst && password is correct
  // Select field that is select: false in Model
  const user = await User.findOne({
    $or: [{ username: usernameEmail }, { email: usernameEmail }],
  }).select("+password");

  if (!user || !(await user.correctPassword(password))) {
    return next(new AppError("Wrong username / email or password", 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});

module.exports.logout = (req, res, next) => {
  res.clearCookie("jwt");
  res.status(200).json({ status: "success" });
};

module.exports.signup = catchAsync(async (req, res, next) => {
  const { username, email, password, passwordConfirm, photo } = req.body;

  const newUser = await User.create({
    username,
    email,
    password,
    passwordConfirm,
    photo,
  });

  createSendToken(newUser, 201, req, res);
});

module.exports.refresh = catchAsync(async (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) return res.status(200).json({ status: "success", user: null });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  // 3) Check if user still exists
  if (!currentUser)
    return res.status(200).json({ status: "success", data: { user: null } });

  res.status(200).json({ status: "success", data: { user: currentUser } });
});
