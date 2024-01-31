const {
  checkUserExists,
  checkValidationErrors,
} = require("./../utils/checkErrors");

module.exports = function (err, req, res, next) {
  console.log("💥 err ->");
  console.log("- - - - - - - - - - - - - - - - - - - -");
  console.log(err);
  console.log("- - - - - - - - - - - - - - - - - - - -");
  console.log("err.isOperational", err.isOperational);

  err.statusCode = err.statusCode || 500;
  err.message = err.isOperational ? err.message : "Something went wrong";

  if (process.env.NODE_ENV === "development" && !err.isOperational)
    err.message += req.originalUrl.startsWith("/api")
      ? " (Backend)"
      : " (Frontend)";

  const errorPrototype = Object.create(err);
  let error = Object.assign(errorPrototype, { ...err });

  // Check possible types of errors
  error = checkUserExists(error);
  error = checkValidationErrors(error);

  return res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};
