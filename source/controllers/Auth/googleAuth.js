const { OAuth2Client } = require("google-auth-library");
const { User } = require("../../db");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
	const { token } = req.body;
	console.log(token);
	try {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.GOOGLE_CLIENT_ID,
		});
		const payload = ticket.getPayload();
		console.log(payload);
		const { given_name, family_name, email } = ticket.getPayload();
		const user = await User.findOne({
			where: { email },
		});
		console.log(user);
		if (!user) {
			const newUser = await User.create({
				name: given_name,
				surname: family_name,
				email,
			});
			console.log(newUser);
			await newUser.createWishlist({ name: `Wishlist de ${given_name}` });
			await newUser.createCart({ name: `Carrito de ${given_name}` });

			return res.status(201).send(newUser);
		} else {
			return res.status(200).send(user);
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({ msg: "error al iniciar sesion", error });
	}
};

module.exports = googleLogin;
