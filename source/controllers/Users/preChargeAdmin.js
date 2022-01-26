const { User } = require("../../db");
const bcrypt = require("bcrypt");

const preChargeAdmin = async () => {
	try {
		const [adminUser, created] = await User.findOrCreate({
			where: { email: "e_commerce@gmail.com" },
			defaults: {
				name: "adminTest",
				surname: "ATR",
				role: "admin",
			},
		});
		if (created) {
			const hashedPwd = await bcrypt.hash("admin", 12);
			await adminUser.createUserLoginDetail({ password: hashedPwd });
			await adminUser.createClientAddress({
				address: "tarantino 2740",
				postalCode: "8300",
				city: "Neuquen",
				province: "Neuquen",
			});
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = preChargeAdmin;
