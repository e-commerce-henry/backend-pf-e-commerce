const { ContactForm } = require("../../db.js");

const getContactForms = async (req, res) => {
	try {
		let contactForms = await ContactForm.findAll();

		if (contactForms.length === 0) {
			return res.status(404).send("No hay mensajes");
		}
		res.status(200).send(contactForms);
	} catch (error) {
		res.status(500).send({ error, msg: "error al buscar todos los mensajes" });
	}
};
module.exports = getContactForms;
