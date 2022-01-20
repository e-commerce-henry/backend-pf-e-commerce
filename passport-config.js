const LocalStrategy = require("passport-local").Strategy;
const { User, UserLoginDetail } = require("./source/db");
const bcrypt = require("bcrypt");

const initialize = (passport) => {
	//defining LocalStrategy for passport middleware
	const authenticateUser = async (email, pwd, done) => {
		console.log("entra al authenticateuser");
		try {
			const foundUser = await User.findOne({
				where: { email: email },
				include: { model: UserLoginDetail },
			});
			console.log(foundUser.userLoginDetail.password);
			if (!foundUser) {
				console.log("no encontro usuario");
				return done(null, false, { msg: "That email is not registered" });
			}
			bcrypt.compare(
				pwd,
				foundUser.userLoginDetail.password,
				(err, isMatch) => {
					if (err) throw err;
					if (isMatch) {
						console.log("se econtro password");
						return done(null, foundUser);
					} else {
						return done(null, false, { msg: "incorrect Password" });
					}
				}
			);
		} catch (err) {
			return done(err);
		}
	};

	passport.use(
		new LocalStrategy(
			{ usernameField: "email", passwordField: "pwd" },
			authenticateUser
		)
	);
	// serialize user to store in session
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
	passport.deserializeUser(async (id, done) => {
		const user = await User.findByPk(id);
		done(null, user);
	});
};

module.exports = initialize;
