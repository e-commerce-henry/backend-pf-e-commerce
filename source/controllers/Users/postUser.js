const { User } = require("../../db");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
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
	)
		return res.status(400).send("All fields are required");

	const duplicate = await User.findOne({ where: { email: email } });
	if (duplicate)
		return res.status(409).send("That email has already been registered"); //conflict

	try {
		const hashedPwd = await bcrypt.hash(pwd, 12); //second param is number of SaltRounds to hash;
		const newUser = await User.create({
			name,
			surname,
			email,
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
		res.status(201).send({ message: "New User created", newUser });
	} catch (err) {
		console.log(err);
		res.status(500).send(err); // server error
	}
};

module.exports = createUser;
