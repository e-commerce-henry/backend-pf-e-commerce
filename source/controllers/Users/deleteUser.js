const {
	User,
	UserLoginDetail,
	ClientAddress,
	Wishlist,
	Cart,
} = require("../../db");

const deleteUser = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findOne({
			where: { id: id },
			include: [
				{ model: UserLoginDetail },
				{ model: ClientAddress },
				{ model: Wishlist },
				{ model: Cart },
			],
		});

		await user.destroy();
		res.status(200).send("The user was deleted");
	} catch (err) {
		console.log(err);
		res.status(500).send(err); //server error
	}
};

module.exports = deleteUser;
