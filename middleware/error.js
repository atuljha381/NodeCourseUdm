const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  console.log(err);

  //Mongoose Bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  //Mongoose Duplicate Error
  if (err.code === 11000) {
    const message = `Dupicate Value(s) not allowed`;
    error = new ErrorResponse(message, 400);
  }

  //Mongoose Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statuscode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};
module.exports = errorHandler;
