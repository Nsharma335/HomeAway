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
      new JwtStrategy(opts, (jwt_payload, callback) => {
        console.log("jwt_payload.username",jwt_payload.email)
        db.findUser({ email: jwt_payload.email },
          function (res) {
            var user = res;
            delete user.password;
            callback(null, user);
        }, function (err) {
            return callback(err, false);
        });
    }));
};
