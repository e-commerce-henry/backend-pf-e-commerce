const { User } = require("../../db");

const getUserById = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findByPk(id);
		if (!user) {
			return res.status(400).send("Usuario no encontrado");
		}
		res.send(user);
	} catch (err) {
		res.status(500).send(err);
	}
};
module.exports = getUserById;
