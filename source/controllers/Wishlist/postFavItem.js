const { Wishlist, WishlistItem } = require("../../db");

const addFavItem = async (req, res) => {
	//solamente usuario logueado puede insertar items en wishlist
	const { productId, userId, price } = req.body; //puede q venga de otro lado

	try {
		//busco la wishlist que le pertenece al usuario
		const userWishlist = await Wishlist.findOne({ where: { userId: userId } });
		//chequeo si el producto esta o no en la lista
		const WishlistItemCheck = await WishlistItem.findOne({
			where: {
				productId: productId,
				wishlistId: userWishlist.id,
			},
		});
		if (WishlistItemCheck) {
			res.send("El producto ya esta en tu wishlist");
		} else {
			await WishlistItem.create({
				wishlistId: userWishlist.id,
				productId: productId,
				price: price,
			});
			res
				.status(201)
				.send("El producto fue agregado a tu wishlist exitosamente");
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

module.exports = addFavItem;
