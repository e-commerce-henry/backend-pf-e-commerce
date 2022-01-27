const { User, ClientAddress } = require("../../db");

const getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll({
			include: { model: ClientAddress },
			attributes: { exclude: ["createdAt", "updatedAt"] },
		});
		console.log(users);
		if (users.length === 0) {
			return res.status(400).send("No hay usuarios guardados");
		}

		res.send(users);
	} catch (err) {
		res.status(500).send(err);
	}
};
module.exports = getAllUsers;
