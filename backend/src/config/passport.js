const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            username: profile.displayName,
            email,
            isVerified: true,
            password: null,
          });
        }

        const token = generateToken(user._id);
        return done(null, { user, token });
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((data, done) => {
  done(null, data);
});

passport.deserializeUser((data, done) => {
  done(null, data);
});

module.exports = passport;
