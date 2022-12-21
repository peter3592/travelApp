class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    // this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.status = "error";
    this.isOperational = true;

    // Error.captureStackTrace(this, this.constructor);

    // This is to prevent the constructor method from appearing in the stack trace.
    // Blizsie vysvetlenie: https://lucasfcosta.com/2017/02/17/JavaScript-Errors-and-Stack-Traces.html
  }
}

module.exports = AppError;
