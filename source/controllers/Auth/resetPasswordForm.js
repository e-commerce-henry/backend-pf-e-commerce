const { User, UserLoginDetail } = require("../../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const resetPwdForm = async (req, res) => {
	const { id, token } = req.params;
	const { pwd } = req.body;

	if (!id || !token || !pwd) {
		return res.status(400).send("id, token and pwd are required");
	}
	try {
		const foundUser = await User.findByPk(id, {
			include: { model: UserLoginDetail },
		});

		if (!foundUser) {
			return res.status(404).send("No se encontro usuario");
		}
		const secret =
			process.env.PASSWORD_RESET_SECRET + foundUser.userLoginDetail.password;
		const payload = jwt.verify(token, secret);

		const hashedPwd = await bcrypt.hash(pwd, 12);
		await foundUser.userLoginDetail.update({ password: hashedPwd });

		res.status(200).send({ msg: "Password modified", foundUser });
	} catch (err) {
		res.status(500).send(err.message);
	}
};

module.exports = resetPwdForm;
