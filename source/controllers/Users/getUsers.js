const { User } = require("../../db");

const getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll();
		if (users.length === 0) {
			return res.status(400).send("No hay usuarios guardados");
		}

		res.send(users);
	} catch (err) {
		res.status(500).send(err);
	}
};
module.exports = getAllUsers;
