const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  // don't crash during tests if not provided
  console.warn('Google OAuth not configured (GOOGLE_CLIENT_ID/SECRET missing)');
} else {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          let user = await User.findOne({ $or: [{ googleId: profile.id }, { email }] });
          if (!user) {
            user = await User.create({
              googleId: profile.id,
              email,
              username: profile.displayName
            });
          } else if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }
          return done(null, user);
        } catch (err) {
          done(err, null);
        }
      }
    )
  );
}
