const { Cart, CartItem } = require("../../db");

const getCartItems = async (req, res) => {
	const { userId } = req.params; //puede venir de otro lado
	console.log(userId)
	if (!userId) {
		res.status(400).send("Imposible obtener carrito sin userId");
	} else {
		try {
			const userCart = await Cart.findAll({
				where: { userId: userId },
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
				include: {
					model: CartItem,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
			});
			console.log(userCart);
			if (userCart[0].cartItems.length === 0) {
				res.status(404).send("El carrito esta vacio");
			} else {
				res.status(200).send(userCart);
			}
		} catch (err) {
			res.status(500).send(err);
		}
	}
};

module.exports = getCartItems;
