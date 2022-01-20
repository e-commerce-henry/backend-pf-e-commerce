const { User } = require("../../db");

const deleteUser = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ where: { email: email } });
		console.log(user);
		await user.destroy();
		res.status(200).send("The user was deleted");
	} catch (err) {
		console.log(err);
		res.status(500).send(err); //server error
	}
};

module.exports = deleteUser;
