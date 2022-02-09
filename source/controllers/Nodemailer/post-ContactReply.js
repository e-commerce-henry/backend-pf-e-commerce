const { transporter } = require("./transporter");
const { ContactForm } = require("../../db");

const answerEmail = async (req, res) => {
	try {
		console.log(req.body);
		const { email, answer, name } = req.body;
		const { id } = req.params;

		if (!email || !answer || !name || !id) {
			return res
				.status(400)
				.send({ msg: "se requiere email, answer, name e id" });
		}

		await transporter.sendMail({
			from: `ATR Computación <atrcomputacionstore@gmail.com>`,
			to: email,
			subject: "La respuesta a tu consulta",
			text: `Hola ${name}! Esperamos te encuentres bien! Te contactamos en respuesta a tu consulta: ${answer}.`,
			html: `<h2>Hola ${name}! Esperamos te encuentres bien!</h2><p>Te contactamos en respuesta a tu consulta: ${answer}.</p>`,
		});
		const foundForm = await ContactForm.findByPk(id);
		await foundForm.update({
			status: "answered",
		});
		console.log(foundForm);
		res.status(200).send({ success: "Email Sent!", foundForm: foundForm });
	} catch (err) {
		res.status(500).send(err.message);
	}
};

module.exports = answerEmail;
