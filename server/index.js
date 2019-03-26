const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

// configures passport
passport.use(
  // this has internal code to identify 'google' as a string
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);
      console.log('profile', profile);
    }
  )
);

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;
app.listen(PORT);

/* OAuth overview (in dev env)

// CLIENT
// user clicks 'Login'
  // direct to express server -> localhost:5000/auth/google

// EXPRESS SERVER
// forward user's req to Google server from express server
  // direct to Google server -> google.com/auth?appId=123

// GOOGLE SERVER
// ask user if they grant permission
// ** assumingly ** user grants permission
  // redirect back to express route -> localhost:5000/auth/google/callback?code=456

// BACK @ EXPRESS SERVER
// put user on hold, take 'code=456' from URL
// send req to Google with 'code' included

// BACK @ GOOGLE SERVER
// Google sees 'code' in URL, replues with details about this user

// BACK AGAIN @ EXPRESS SERVER
// get user details, create new record in database

*/
