const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");

const User = require("./../models/userModel");
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
  // res.cookie("jwt", token);
  console.log("Sending cookie");

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
module.exports.protect = catchAsync(async (req, res, next) => {
  console.log("COOKIES", req.cookies);
  // 1) Getting token from cookies
  const token = req.cookies?.jwt;

  if (!token)
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );

  // 2) Verification token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  // 3) Check if user still exists
  if (!currentUser)
    return next(new AppError("The user does no longer exists", 401));

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat))
    return next(
      new AppError("User recently changed password! Please log in again", 401)
    );

  // 5) Pass current user to following middlewares.
  req.currentUser = currentUser;

  next();
});

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

  console.log("Login successful");

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});

module.exports.logout = (req, res, next) => {
  res.clearCookie("jwt");
  res.status(200).json({ status: "success" });
};

module.exports.signup = catchAsync(async (req, res, next) => {
  const { username, email, password, passwordConfirm } = req.body;

  const newUser = await User.create({
    username,
    email,
    password,
    passwordConfirm,
  });

  createSendToken(newUser, 201, req, res);
});
