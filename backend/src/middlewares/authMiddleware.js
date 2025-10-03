const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token provided' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = { id: user._id, email: user.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized', error: err.message });
  }
};
