const { Cart, CartItem } = require("../../db");

const deleteCartItem = async (req, res) => {
	console.log(req.body)
	const { productId, userId } = req.body; //puede venir de otro lado
	if (!productId || !userId) {
		res
			.status(400)
			.send("No se puede borrar item sin saber el productId y userId");
	} else {
		try {
			const userCart = await Cart.findOne({
				where: { userId: userId },
				include: {
					model: CartItem,
					where: {
						productId: productId,
					},
				},
			});

			if (!userCart) {
				res.status(404).send("El producto no se encuentra en el carrito");
			} else {
				const productToDelete = userCart.cartItems[0];
				await productToDelete.destroy();
				res.status(200).send("El producto fue borrado del carrito");
			}
		} catch (err) {
			res.status(500).send(err);
		}
	}
};

module.exports = deleteCartItem;
