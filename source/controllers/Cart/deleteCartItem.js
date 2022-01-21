const { Cart, CartItem } = require("../../db");

const deleteCartItem = async (req, res) => {
	const { productId, userId } = req.body; //puede venir de otro lado

	try {
		const userCart = await Cart.findOne({
			where: { userId: userId },
		});

		const cartItemCheck = await CartItem.findOne({
			where: {
				productId: productId,
				cartId: userCart.id,
			},
		});
		if (!cartItemCheck) {
			res.status(404).send("El producto no se encuentra en el carrito");
		} else {
			await cartItemCheck.destroy();
			res.status(200).send("El producto fue borrado del carrito");
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

module.exports = deleteCartItem;
