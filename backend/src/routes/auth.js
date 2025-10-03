const express = require('express');
const passport = require('passport');
const router = express.Router();
const {  login, googleCallback, verifyEmailOtp, loginUser } = require('../controllers/authControllers');
const { registerUser } = require('../controllers/authControllers');


router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/verify-otp', verifyEmailOtp);


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/login' }), googleCallback);

module.exports = router;
