const express = require('express');
const passport = require('passport');
const router = express.Router();
const {  login, googleCallback, verifyEmailOtp, loginUser, registerWithoutVerify } = require('../controllers/authControllers');


// Use seamless signup by default
router.post('/signup', registerWithoutVerify);
router.post('/login', loginUser);
router.post('/verify-otp', verifyEmailOtp);


//  Google login routes
router.get( '/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get( '/google/callback',passport.authenticate('google', { session: false }), googleCallback);

// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/login' }), googleCallback);

module.exports = router;
