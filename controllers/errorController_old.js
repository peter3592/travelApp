const AppError = require("./../utils/appError");

const sendErrorDev = function (err, req, res) {
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // A) Error is coming from API, send JSON object as an error
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  if (req.originalUrl.startsWith("/api")) {
    console.log("💔💔 API ERROR", err.message);

    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // - - - - - - - - - - - - - - - - - - - - - - - -
  // B) Error is coming from website, render an error
  // - - - - - - - - - - - - - - - - - - - - - - - -

  // 1) Log error
  console.error("ERROR 💥", err);
  // 2) Send generic message
  res.clearCookie("jwt");
  return res.status(err.statusCode).render("error", {
    msg: err.message,
  });
};

const sendErrorProd = function (err, req, res) {
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // A) Error is coming from API, send JSON object as an error
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  if (req.originalUrl.startsWith("/api")) {
    console.log("Je api ...");
    // Operational, trusted error: send message to client
    // This errors (with isOperational) sme vytvorili my
    if (err.isOperational) {
      console.log("Je api a operacny");
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // Programming or other unknown error: don't leak error details

    // 1) Log error
    console.error("ERROR 💥", err, "ERROR 💥");
    // 2) Send generic message
    return res
      .status(500)
      .json({ status: "error", message: "Something went very wrong!" });
  }

  // - - - - - - - - - - - - - - - - - - - - - - - -
  // B) Error is coming from website, render an error
  // - - - - - - - - - - - - - - - - - - - - - - - -
  if (err.isOperational) {
    res.clearCookie("jwt");
    return res.status(err.statusCode).render("error", {
      msg: err.message,
    });
  }
  // Programming or other unknown error: don't leak error details

  // 1) Log error
  console.error("ERROR 💥", err, "ERROR 💥");
  // 2) Send generic message
  res.clearCookie("jwt");
  return res.status(err.statusCode).render("error", {
    msg: "Something went wrong! Please try again later",
  });
};

module.exports = function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  console.log("err ->", err);

  // Development Mode
  if (process.env.NODE_ENV === "development") {
    console.log("Sending error developmentovy ...");
    sendErrorDev(err, req, res);
  }

  // Production Mode
  if (process.env.NODE_ENV === "production") {
    const errorProto = Object.create(err);
    let error = Object.assign(errorProto, { ...err });

    // Username already exists
    if (
      error.name === "MongoServerError" &&
      error.stack.includes("username") &&
      error.stack.includes("dup key")
    ) {
      error = new AppError("This username already exists", 400);
    }

    // Validation errors of all forms
    if (
      error.name === "ValidationError" &&
      (error?.errors?.name ||
        error?.errors?.location ||
        error?.errors?.photo ||
        error?.errors?.username ||
        error?.errors?.password ||
        error?.errors?.passwordConfirm)
    ) {
      error = new AppError(
        error?.errors?.name?.properties?.message ||
          error?.errors?.location?.properties?.message ||
          error?.errors?.photo?.properties?.message ||
          error?.errors?.username?.properties?.message ||
          error?.errors?.password?.properties?.message ||
          error?.errors?.passwordConfirm?.properties?.message,
        400
      );
    }

    sendErrorProd(error, req, res);
  }
};
