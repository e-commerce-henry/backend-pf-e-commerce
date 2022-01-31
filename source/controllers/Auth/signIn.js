const { User, UserLoginDetail } = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signIn = async (req, res) => {
	try {
		const foundUser = await User.findOne({
			where: { email: req.body.email },
			include: { model: UserLoginDetail },
		});

		if (!foundUser) {
			return res.status(400).send("Usuario no encontrado");
		}
		bcrypt.compare(
			req.body.pwd,
			foundUser.userLoginDetail.password,
			(err, isMatch) => {
				if (err) throw err;
				if (isMatch) {
					const maxAge =
						foundUser.role === "admin"
							? 600 //seconds - 10 min
							: 86400; //seconds - 24h
					const token = jwt.sign(
						{ id: foundUser.id },
						process.env.ACCESS_SECRET,
						{
							expiresIn: maxAge,
						}
					);

					res.cookie("jwt", token, {
						httpOnly: true,
						sameSite: "none",
						secure: true,
						maxAge: maxAge * 1000,

					});
					res.cookie("jwt-Logged", process.env.CLIENT_SIDE_AUTH_COOKIE, {
						maxAge: maxAge * 1000,
						sameSite: "none",
						secure: true,

					});
					res.status(200).send({ user: foundUser.id });
				} else {
					return res
						.status(401)
						.send({ token: null, message: "Invalid password" });
				}
			}
		);
	} catch (error) {
		res.status(500).send(err);
	}
};

module.exports = signIn;
