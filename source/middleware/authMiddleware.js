const { User } = require("../db");
const admin = require("../config/firebase-config");

const requireAuth = async (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
	console.log("token", token);
	const decodedToken = await admin.auth().verifyIdToken(token);
	if (decodedToken) {
		return next();

		// jwt.verify(token, process.env.ACCESS_SECRET, (err, decodedToken) => {
		// 	if (err) {
		// 		console.log(err);
		// 		res.status(400).send("invalid token");
		// 		// res.redirect("/signIn"); //invalid token
		// 	} else {
		// 		console.log(decodedToken);
		// 		req.userId = decodedToken.id;
		// 		next();
		// 	}
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
