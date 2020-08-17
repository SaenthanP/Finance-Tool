require ('dotenv').config();

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

module.exports = passport => {

     passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        try {
            User.findOne({ username: jwt_payload.username }).then(user => {

                if (user) {
                    return done(null, user);
                }
                return done(null, false);

            });
        } catch (err) {
            console.log(err);
        }
    }));
}


