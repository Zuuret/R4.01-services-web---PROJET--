const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model("User");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user=>{
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            callbackURL: 'http://localhost:5000/auth/google/callback',
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await User.findOne({googleid: profile.id});
                if (existingUser) {
                    return done(null, existingUser);
                }
                const user = await new User({
                    googleid: profile.id,
                    displayName: profile.displayName
                }).save();
                done(null, user);
            } catch (err) {
                done(err, null); // Error-first callback
            }
        }
    )
);
