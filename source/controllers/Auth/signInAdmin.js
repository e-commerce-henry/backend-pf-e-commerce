const { User, UserLoginDetail } = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signInAdmin = async (req, res) => {
	try {
		const foundUser = await User.findOne({
			where: { email: req.body.email },
			include: { model: UserLoginDetail },
		});

		if (!foundUser) {
			return res.status(404).send("Usuario no encontrado");
		} else if (foundUser.role !== "admin") {
			return res.status(400).json({ msg: "no tiene privilegios de admin" });
		}
		bcrypt.compare(
			req.body.pwd,
			foundUser.userLoginDetail.password,
			(err, isMatch) => {
				if (err) throw err;
				if (isMatch) {
					const maxAge = 18000;
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
		res.status(500).send(err.message);
	}
};

module.exports = signInAdmin;
