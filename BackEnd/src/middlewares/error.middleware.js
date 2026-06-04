/**
 * Centralized Error Handling Middleware
 * Captures all application errors to return a clean response
 */
function errorMiddleware(err, req, res, next) {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (process.env.NODE_ENV !== 'production') {
    console.error(`[${err.name || 'Error'}] : ${message}`);
    if (err.stack) console.error(err.stack);
  }

  res.status(status).json({
    success: false,
    error: {
      name: err.name || 'Error',
      message: message,
    },
  });
}

export default errorMiddleware;