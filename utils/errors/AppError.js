// this will help us throw a consistence and structured error
// it is extended from the Native js Error
class AppError extends Error {
  constructor(message, details = null, statusCode = 500) {
    // call the parent constructor
    super(message);

    // custom status code
    this.statusCode = statusCode;

    // any extra detail about the actual error
    this.details = details;

    // will help us distinquish btw operation error(validation or db) or programming error
    this.isOperational = true;
    // Makes error logs cleaner
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
