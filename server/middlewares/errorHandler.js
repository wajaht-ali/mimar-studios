const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const nodeEnv = process.env.NODE_ENV;

  res.status(statusCode).json({
    message: err.message,
    errorStack: nodeEnv === "development" ? err.stack : "",
  });
};

export default globalErrorHandler;
