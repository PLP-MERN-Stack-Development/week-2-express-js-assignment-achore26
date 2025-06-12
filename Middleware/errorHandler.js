//Global hand;er middleware for handling errors in an Express application
function errorHandler(err, req, res, next) {
  console.error(err.stack); 

  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
}

module.exports = errorHandler;
