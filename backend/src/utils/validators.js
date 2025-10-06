exports.isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
exports.minLength = (s, n) => typeof s === 'string' && s.length >= n;
