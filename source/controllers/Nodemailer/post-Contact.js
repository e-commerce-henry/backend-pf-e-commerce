const { transporter } = require("./transporter");

const contactEmail = async (req, res) => {
	try {
		const { email, name } = req.body;
		console.log(email, name);
		await transporter.sendMail({
			from: `ATR Computación <atrcomputacionstore@gmail.com>`,
			to: email,
			subject: "Tu mensaje ha sido recibido",
			text: `Hola ${name}! Gracias por contactarnos! Recibimos tu mensaje y pronto estará siendo revisado por nuestro staff.`,
			html: `<h2>Hola ${name}! Gracias por contactarnos!</h2><p>Recibimos tu mensaje y pronto estará siendo revisado por nuestro staff.</p>`,
		});
		res.send({ success: "Email Sent!" });
	} catch (err) {
		res.status(500).send(err.message);
	}
};

module.exports = contactEmail;
