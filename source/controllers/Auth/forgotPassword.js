const { User, UserLoginDetail } = require("../../db");
const jwt = require("jsonwebtoken");
const { transporter } = require("../Nodemailer/transporter");

const forgotPwd = async (req, res) => {
	const { email } = req.body;
	console.log(email);
	if (!email) {
		return res.status(400).send("Es necesario el email");
	}

	try {
		const foundUser = await User.findOne({
			where: { email },
			include: { model: UserLoginDetail },
		});

		if (!foundUser) {
			return res.status(404).send("User not registered");
		}
		const secret =
			process.env.PASSWORD_RESET_SECRET + foundUser.userLoginDetail.password;

		const payload = {
			email: foundUser.email,
			id: foundUser.id,
		};
		const token = jwt.sign(payload, secret, { expiresIn: "15m" });
		const link = `http://localhost:3001/auth/reset-password-verify/${foundUser.id}/${token}`;

		// await transporter.sendMail({
		// 	from: `ATR Computación <atrcomputacionstore@gmail.com>`,
		// 	to: email,
		// 	subject: "Recuperación de contraseña",
		// 	text: `Hola! Recibimos una solicitud para generar una nueva contraseña. Por favor, abre el siguiente link y sigue los pasos. Ten en cuenta que dicho link es válido durante 15 minutos solamente. ${link}`,
		// 	html: `<h2>Hola! Recibimos una solicitud para generar una nueva contraseña.</h2><p>Por favor, abre el siguiente link y sigue los pasos. Ten en cuenta que dicho link es válido durante 15 minutos solamente. </p><br>${link}`,
		// });
		//send email with link
		res.send(link);
	} catch (error) {
		res.status(500).send(error.message);
	}
};

module.exports = forgotPwd;
