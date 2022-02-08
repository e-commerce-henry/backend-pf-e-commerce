const { transporter } = require("./transporter");

const welcomeEmail = async (req, res) => {
	try {
		const { email, name } = req.body;

		await transporter.sendMail({
			from: `ATR Computacion`,
			to: email,
			subject: "Registro exitoso!",
			text: `Hola ${name}! Bienvenido a ATR Computación. Tu proceso de registro se ha efectuado correctamente. Te esperamos en nuestra tienda!`,
			html: `<h2>Hola ${name}! Bienvenido a ATR Computación</h2><p>Tu proceso de registro se ha efectuado correctamente. Te esperamos en nuestra tienda!</p>`,
		});
		res.send({ success: "Email Sent!" });
	} catch (err) {
		res.status(500).send(err.message);
	}
};

module.exports = welcomeEmail;
