const ErrorResponse = require('../utils/errorResponse');

const admin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to access this route', 403));
  }
  next();
};

module.exports = admin; 