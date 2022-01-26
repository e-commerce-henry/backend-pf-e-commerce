const { SaleBanner, Product } = require("../../db.js");

const postSaleBanner = async (req, res, next) => {
	try {
		console.log(req.body);
		const { discount, productId } = req.body;
		const foundProduct = await Product.findOne({
			where: { id: productId },
		});
		if (!foundProduct) {
			return res.status(400).send("Producto no econtrado");
		}
		const saleItem = await foundProduct.createSaleBanner({
			discount,
			productId,
			name: foundProduct.name,
		});
		// let [newSaleBanner, created] = await SaleBanner.findOrCreate({
		// 	where: { productId },
		// 	defaults: {
		// 		discount,
		//         name:
		// 	},

		res.status(200).json(saleItem);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	postSaleBanner,
};
