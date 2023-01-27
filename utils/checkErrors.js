const AppError = require("./AppError");

module.exports.checkUserExists = (error) => {
  if (error.name === "MongoServerError" && error.stack.includes("dup key")) {
    if (error.stack.includes("username"))
      return new AppError("This username already exists", 400);
    if (error.stack.includes("email"))
      return new AppError("The email is already used", 400);
    if (error.stack.includes("location"))
      return new AppError("Place with same coordinates already exists", 400);
  }

  return error;
};

module.exports.checkValidationErrors = (error) => {
  if (
    error.name === "ValidationError" &&
    (error?.errors?.name ||
      error?.errors?.email ||
      // error?.errors?.user ||
      error?.errors?.location ||
      error?.errors?.photo ||
      error?.errors?.username ||
      error?.errors?.password ||
      error?.errors?.passwordConfirm)
  ) {
    return new AppError(
      error?.errors?.name?.properties?.message ||
        error?.errors?.email?.properties?.message ||
        // error?.errors?.user?.properties?.message ||
        error?.errors?.location?.properties?.message ||
        error?.errors?.photo?.properties?.message ||
        error?.errors?.username?.properties?.message ||
        error?.errors?.password?.properties?.message ||
        error?.errors?.passwordConfirm?.properties?.message,
      400
    );
  }

  return error;
};
