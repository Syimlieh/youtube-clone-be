import { logger } from "../log/logger.js";
import { STATUS_MESSAGE } from "../utils/constants.js";

// this will be our global error handler and will be used as a middleware after our routes
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;

  logger.error(
    `${req.method} ${req.originalUrl} | ${statusCode} | ${err.message}`
  );
  let message = err.message || STATUS_MESSAGE[500];

  // for duplicate error
  if (err?.details?.code === 11000) {
    let errorDetail = err.details;
    statusCode = 409;
    // this will get the key
    const duplicatedField = Object.keys(errorDetail.keyValue)[0];
    // Capitalize the first word for the key
    message = `${duplicatedField.charAt(0).toUpperCase() + duplicatedField.slice(1)} already exists.`;
  }

  // Respond with a structured error message
  res.status(statusCode).json({
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { detail: err?.details?.message || STATUS_MESSAGE[500] }),
    // for development we can returned the detail of the error that will be coming from our AppError that capture our actual error
  })
};

export default errorHandler;