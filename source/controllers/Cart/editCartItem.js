const { Cart, CartItem } = require("../../db");

const editCartItem = async (req, res) => {
	const { productId, userId, quantity } = req.body; //puede venir de otro lado

	if (!productId || !userId || !quantity) {
		res
			.status(400)
			.send(
				"No se puede editar carrito sin saber productId, user,Id, y cantidad"
			);
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
				res.status(400).send("No se encontro producto en su carrito");
			} else {
				const productToEdit = userCart.cartItems[0];
				productToEdit.quantity = quantity;
				productToEdit.save();
				res.status(200).send("Su carrito ha sido actualizado");
			}
		} catch (err) {
			res.status(500).send(err);
		}
	}
};

module.exports = editCartItem;
