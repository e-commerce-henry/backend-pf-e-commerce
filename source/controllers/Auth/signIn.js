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
							? 18000 //seconds - 5hs
							: 86400; //seconds - 24h
					const token = jwt.sign(
						{ id: foundUser.id },
						process.env.ACCESS_SECRET,
						{
							expiresIn: maxAge,
						}
					);

					res.status(200).send({ user: foundUser.id, token });
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
