const jwt = require("jsonwebtoken");
const { User } = require("../db");

const requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;

	if (token) {
		jwt.verify(token, process.env.ACCESS_SECRET, (err, decodedToken) => {
			if (err) {
				console.log(err);
				res.status(400).send("invalid token");
				// res.redirect("/signIn"); //invalid token
			} else {
				console.log(decodedToken);
				req.userId = decodedToken.id;
				next();
			}
		});
	} else {
		res.status(400).send("Not authorized. Please log in");
		// res.redirect("/signIn");
	}
};

const isAdmin = async (req, res, next) => {
	console.log(req.userId);
	const user = await User.findByPk(req.userId);
	console.log(user);
	if (user.role === "admin") {
		next();
	} else {
		return res.status(403).send("Requiere privilegios de administrador");
	}
};

module.exports = { requireAuth, isAdmin };
