const { User, UserLoginDetail, ClientAddress } = require("../../db");
const bcrypt = require("bcrypt");

const editUser = async (req, res) => {
	const {
		name,
		surname,
		email,
		pwd,
		role,
		address,
		postalCode,
		city,
		province,
		addressId,
		floor,
	} = req.body;
	const { id } = req.params;
	if (
		!name ||
		!surname ||
		!email ||
		!addressId ||
		!postalCode ||
		!city ||
		!province
	)
		return res.status(400).send("All fields are required");
	try {
		const user = await User.findOne({
			where: { id: id },
			include: [
				{ model: UserLoginDetail },
				{ model: ClientAddress, where: { id: addressId } },
			],
		});
		console.log(role);
		console.log(user);
		await user.update({
			name,
			surname,
			email,
			role: role || "user",
		});
		user.save();
		await user.clientAddresses[0].update({
			address,
			city,
			province,
			postalCode,
			floor,
		});
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

		res.status(200).send("User details were updated");
	} catch (err) {
		console.log(err);
		res.status(500).send(err); //server error
	}
};

module.exports = editUser;
