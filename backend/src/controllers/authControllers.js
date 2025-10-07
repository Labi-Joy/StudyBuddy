const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const { sendEmail } = require('../utils/sendEmail');
const bcrypt = require('bcryptjs');


exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });


    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    user = await User.create({
      username,
      email,
      password,
      verificationOtp: otp,
      verificationOtpExpires: otpExpires,
    });

    await sendEmail({
      to: email,
      subject: 'Verify your email',
      html: `<p>Hello ${username},</p>
             <p>Your verification OTP is:</p>
             <h2>${otp}</h2>
             <p>This OTP will expire in 10 minutes.</p>`,
    });

    res.status(201).json({ message: 'User registered. Please check your email for the OTP.' });
  } catch (err) {
    next(err);
  }
};


exports.registerWithoutVerify = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    let existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      isVerified: true, 
    });

    const token = generateToken(newUser._id);

    res.status(201).json({
      message: 'User registered successfully (no email verification required)',
      token,
      user: newUser,
    });
  } catch (err) {
    next(err);
  }
};



exports.verifyEmailOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({
      email,
      verificationOtp: otp,
      verificationOtpExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.verificationOtp = undefined;
    user.verificationOtpExpires = undefined;
    await user.save();

    res.json({ message: 'Email verified successfully. You can now login.' });
  } catch (err) {
    next(err);
  }
};


exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    if (!user.isVerified) {
      return res.status(403).json({ message: 'Please verify your email before logging in' });
    }

    const isMatch = user.password && (await bcrypt.compare(password, user.password));
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);
    res.json({ token, user });
  } catch (err) {
    next(err);
  }
}



exports.googleCallback = async (req, res, next) => {
  try {
    const { user, token } = req.user;

    res.json({
      message: 'Google login successful',
      token,
      user,
    });
  } catch (err) {
    next(err);
  }
};


