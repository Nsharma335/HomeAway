'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User=require('../backend/models/User')
var db = require('./db');
var config = require('./settings');

// Setup work and export for the JWT passport strategy

module.exports = function(passport) {
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
  
    passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
        console.log("jwt_payload.username",jwt_payload.email)
        db.findUser({ email: jwt_payload.email })
       console.log("user found in db..")
          .then(user => {
            if (user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch(err => console.log(err));
      })
    );
  };
