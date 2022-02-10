const { User, UserLoginDetail } = require("../../db");
const jwt = require("jsonwebtoken");

const resetPwdVerify = async (req, res) => {
	const { id, token } = req.params;

	if (!id || !token) {
		return res.status(400).send("id and token are required");
	}
	try {
		const foundUser = await User.findByPk(id, {
			include: { model: UserLoginDetail },
		});
		if (!foundUser) {
			return res.status(404).send("Invalid Id");
		}
		const secret =
			process.env.PASSWORD_RESET_SECRET + foundUser.userLoginDetail.password;

		const payload = jwt.verify(token, secret);
		res.redirect(
			`http://cliente-pf-e-commerce.herokuapp.com/reset-password/${id}/${token}`
		);
	} catch (error) {
		res.status(500).send(error.message);
	}
};

module.exports = resetPwdVerify;
