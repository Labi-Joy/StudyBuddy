module.exports = (err, req, res, next) => {
  console.error(err);
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: Object.values(err.errors).map(val => val.message).join(', ')
    });
  }
  
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
    });
  }
  
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'Invalid data format'
    });
  }
  
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error'
  });
};
