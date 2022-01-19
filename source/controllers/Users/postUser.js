const { User } = require("../../db");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
	const { name, surname, email, pwd, role } = req.body;

	if (!name || !surname || !email || !pwd)
		return res.status(400).send("All fields are required");

	const duplicate = await User.findOne({ where: { email: email } });
	if (duplicate)
		return res.status(409).send("That email has already been registered"); //conflict

	try {
		const hashedPwd = bcrypt.hash(pwd, 12);
		const newUser = await User.create({
			name: name,
			surname: surname,
			email: email,
		});
	} catch (err) {
		res.status(500).send(err); // server error
	}
};
