const { User, ClientAddress } = require("../../db");

const getUserById = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findByPk(id, {
			include: {
				model: ClientAddress,
				attributes: { exclude: ["createdAt", "updatedAt"] },
			},
		});
		if (!user) {
			return res.status(400).send("Usuario no encontrado");
		}
		res.send(user);
	} catch (err) {
		res.status(500).send(err);
	}
};
module.exports = getUserById;
