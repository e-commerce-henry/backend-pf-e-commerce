const { ContactForm } = require("../../db.js");

const deleteContactForm = async (req, res) => {
	const { contactId } = req.params;
	try {
		let contactForm = await ContactForm.findByPk(contactId);

		await contactForm.destroy();

		res.status(200).send("Contacto borrado con exito");
	} catch (error) {
		res.status(500).send({ error, msg: "error al borrar mensaje" });
	}
};
module.exports = deleteContactForm;
