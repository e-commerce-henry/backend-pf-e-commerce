const { Cart, CartItem } = require("../../db");

const addCartItem = async (req, res) => {
	//solamente usuario logueado puede insertar items en cart
	const { productId, userId, price } = req.body; //puede q venga de otro lado
	//el precio puede venir desde el front o puedo realizar busqueda en DB para traer precio con el productID
	if (!productId || !userId || !price) {
		res
			.status(400)
			.send(
				"No se puede agregar producto al carro sin productId, userId, price"
			);
	} else {
		try {
			//busco el carrito que le pertenece al usuario
			const userCart = await Cart.findOne({
				where: { userId: userId },
				include: {
					model: CartItem,
					required: false,
					where: {
						productId: productId,
					},
				},
			});
			//chequeo si el producto esta o no en el carrito
			if (userCart.cartItems.length > 0) {
				res.send("El producto ya esta en tu carrito");
			} else {
				await CartItem.create({
					cartId: userCart.id,
					productId: productId,
					price: price,
					quantity: 1, //por default al agregar, se agrega 1. Luego en ruta editar carrito se adicionan mas en caso que el usuario asi lo requiera
				});
				res
					.status(201)
					.send("El producto fue agregado a tu carrito exitosamente");
			}
		} catch (err) {
			res.status(500).send(err);
		}
	}
};

module.exports = addCartItem;
