const { User, UserLoginDetail } = require("../../db");
const bcrypt = require("bcrypt");

const editUser = async (req, res) => {
	const { name, surname, email, pwd } = req.body;
	const { id } = req.params;
	if (!name || !surname || !email || !pwd)
		return res.status(400).send("All fields are required");
	try {
		const user = await User.findOne({
			where: { id: id },
			include: { model: UserLoginDetail },
		});
		console.log(user.userLoginDetail.password);
		await user.update({
			name: name,
			surname: surname,
			email: email,
		});
		const pwdChangeCheck = await bcrypt.compare(
			pwd,
			user.userLoginDetail.password
		);
		if (!pwdChangeCheck) {
			const hashedNewPwd = await bcrypt.hash(pwd, 12);
			console.log(hashedNewPwd);
			await user.userLoginDetail.update({ password: hashedNewPwd });
			user.save();
		}
		user.save();
		res.status(200).send("User details were updated");
	} catch (err) {
		console.log(err);
		res.status(500).send(err); //server error
	}
};

module.exports = editUser;
