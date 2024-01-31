const AppError = require("./AppError");

module.exports.checkUserExists = (error) => {
  if (error.name === "MongoServerError" && error.stack.includes("dup key")) {
    if (error.stack.includes("username"))
      return new AppError("This username already exists", 400);
    if (error.stack.includes("location"))
      return new AppError("Place with same coordinates already exists", 400);
  }

  return error;
};

const errorType = (errors) => {
  if (!errors) return false;

  if (errors.name) return errors.name;
  if (errors.location) return errors.location;
  if (errors.photo) return errors.photo;
  if (errors.username) return errors.username;
  if (errors.password) return errors.password;
  if (errors.passwordConfirm) return errors.passwordConfirm;
  if (errors.description) return errors.description;

  return false;
};

module.exports.checkValidationErrors = (error) => {
  if (error?.name !== "ValidationError") return error;

  const currentError = errorType(error?.errors);

  if (!currentError) return error;

  return new AppError(currentError.properties.message, 400);
};
