const { User, OrderDetail } = require("../../db");

const createOrder = async (req, res) => {
	const { addressId, total, products } = req.body; //products debe ser un array de objetos con las siguientes propiedades: quantity, price, productId
	const { userId } = req.params;

	if (!userId || !addressId || !total || !products) {
		return res.status(400).send("Se requieren mas datos");
	}
	try {
		const user = await User.findByPk(userId);
		const newOrder = await user.createOrder({
			userId,
			date: new Date(),
			total,
			shippingAddress: addressId,
		});
		const promises = products.map(async (e) => {
			return await OrderDetail.create({
				orderId: newOrder.id,
				quantity: e.quantity,
				price: e.price,
				productId: e.productId,
			});
		});

		const result = await Promise.all(promises);
		if (!result || result.length === 0) {
			res.status(400).send("Error al generar la orden de compra");
		} else {
			res.status(200).send({ message: "Orden ejecutada", result });
		}
	} catch (error) {
		res
			.status(500)
			.send({ error, message: "Error al generar la orden de compra" });
	}
};

module.exports = createOrder;
