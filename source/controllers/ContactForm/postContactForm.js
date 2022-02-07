const { ContactForm } = require("../../db");

const createContactForm = async (req, res) => {
	const { email, name, subject, content } = req.body;

	if (!email || !name || !subject || !content) {
		return res.status(400).send("Todos los campos son obligatorios");
	}
	try {
		const newContactForm = await ContactForm.create({
			email,
			name,
			subject,
			content,
			date: new Date(),
		});

		res.status(200).send(newContactForm);
	} catch (error) {
		res
			.status(500)
			.send({ error, message: "Error al generar el fomrulario de contacto" });
	}
};

module.exports = createContactForm;
