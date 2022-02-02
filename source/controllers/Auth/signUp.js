const { User } = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
	const {
		name,
		surname,
		email,
		pwd,
		address,
		cp,
		city,
		province,
		floor,
		role,
	} = req.body;

	if (
		!name ||
		!surname ||
		!email ||
		!pwd ||
		!address ||
		!cp ||
		!city ||
		!province
	) {
		return res.status(400).send("Faltan datos para proceder");
	}

	try {
		const duplicate = await User.findOne({ where: { email: email } });
		if (duplicate) {
			return res.status(409).send("That email has already been registered"); //conflict
		} else {
			const hashedPwd = await bcrypt.hash(pwd, 12); //second param is number of SaltRounds to hash;
			const newUser = await User.create({
				name,
				surname,
				email,
				password: hashedPwd,
				role,
			});
			//guarda la password en modelo UserLoginDetail
			await newUser.createUserLoginDetail({ password: hashedPwd });
			//genera una wishlist por cada usuario que se cree
			await newUser.createWishlist({ name: `Wishlist de ${name}` });
			//genera un carrito de compra por cada usuario que se cree
			await newUser.createCart({ name: `Carrito de ${name}` });
			//genera una tabla ClientAddress donde guarda sus detalles
			await newUser.createClientAddress({
				address: address,
				postalCode: cp,
				city: city,
				province: province,
				floor: floor,
			});

			const token = jwt.sign({ id: newUser.id }, process.env.ACCESS_SECRET, {
				expiresIn: 3600, // 1 hour
			});
			res.cookie("jwt", token, {
				httpOnly: true,
				sameSite: "none",
				secure: true,
				maxAge: 3600 * 1000,
			});
			res.status(201).send({ user: newUser.id });
		}
	} catch (err) {
		console.log(err);
		res.status(500).send(err); // server error
	}
};

module.exports = signUp;
