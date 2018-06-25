const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models').User;
const CONFIG = require('config').JWT;

module.exports = function(passport) {
	var opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	opts.secretOrKey = CONFIG.encryption;

	passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
		let err, user;
		[err, user] = await to(User.findById(jwt_payload.user_id));

		if(err) return done(err, false);
		if(user) {
			return done(null, user);
		} else {
			return done(null, false);
		}
	}));
}