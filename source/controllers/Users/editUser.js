const { User, UserLoginDetail, ClientAddress } = require("../../db");
const bcrypt = require("bcrypt");

const editUser = async (req, res) => {
	const { name, surname, email, pwd, address, cp, city, province, floor } =
		req.body;
	const { id } = req.params;
	if (!name || !surname || !email || !address || !cp || !city || !province)
		return res.status(400).send("All fields are required");
	try {
		const user = await User.findOne({
			where: { id: id },
			include: [{ model: UserLoginDetail }, { model: ClientAddress }],
		});
		console.log(user.clientAddress);
		await user.update({
			name: name,
			surname: surname,
			email: email,
		});
		user.save();
		if (pwd) {
			const pwdChangeCheck = await bcrypt.compare(
				pwd,
				user.userLoginDetail.password
			);
			if (!pwdChangeCheck) {
				const hashedNewPwd = await bcrypt.hash(pwd, 12);
				await user.userLoginDetail.update({ password: hashedNewPwd });
			}
		}
		await user.clientAddress.update({
			address: address,
			postalCode: cp,
			city: city,
			province: province,
			floor: floor,
		});

		res.status(200).send("User details were updated");
	} catch (err) {
		console.log(err);
		res.status(500).send(err); //server error
	}
};

module.exports = editUser;
