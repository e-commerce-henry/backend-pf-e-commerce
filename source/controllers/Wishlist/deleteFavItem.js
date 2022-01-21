const { Wishlist, WishlistItem } = require("../../db");

const deleteFavItem = async (req, res) => {
	//solamente usuario logueado puede insertar items en wishlist
	const { productId, userId } = req.body; //puede q venga de otro lado
	if (!productId || !userId) {
		res
			.status(400)
			.send("Imposible borrar item de la wishlist sin productId, userId");
	} else {
		try {
			//busco la wishlist que le pertenece al usuario
			const userWishlist = await Wishlist.findOne({
				where: { userId: userId },
				include: {
					model: WishlistItem,
					required: false,
					where: { productId: productId },
				},
			});

			console.log(userWishlist);
			if (userWishlist.wishlistItems.length === 0) {
				res.send(
					"El producto no se puede borrar porque no esta en tu wishlist"
				);
			} else {
				const productToDelete = userWishlist.wishlistItems[0];
				await productToDelete.destroy();
				res
					.status(201)
					.send("El producto fue eliminado de tu wishlist exitosamente");
			}
		} catch (err) {
			res.status(500).send(err);
		}
	}
};

module.exports = deleteFavItem;
