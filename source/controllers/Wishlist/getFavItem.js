const { Wishlist, WishlistItem } = require("../../db");

const getFavItem = async (req, res) => {
	//solamente usuario logueado puede insertar items en wishlist
	const { userId } = req.body; //puede q venga de otro lado

	try {
		//busco la wishlist que le pertenece al usuario
		const userWishlist = await Wishlist.findAll({
			where: { userId: userId },
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
			include: {
				model: WishlistItem,
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			},
		});
		//chequeo  si la lista esta vacia
		if (userWishlist[0].wishlistItems.length === 0) {
			res.status(404).send("La wishlist del usuario esta vacia");
		} else {
			res.status(200).send(userWishlist);
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

module.exports = getFavItem;
