const { Order, OrderDetail, User, ClientAddress } = require("../../db");

const getOrderById = async (req, res) => {
	const { orderId } = req.params;

	if (!orderId) {
		return res.status(404).send("El orderId es requerido");
	}
	try {
		const order = await Order.findByPk(orderId, {
			include: [
				{ model: OrderDetail },
				{
					model: User,
				},
			],
		});
		const address = await ClientAddress.findByPk(order.shippingAddress);

		res.send([order, address]);
	} catch (err) {
		res.status(500).send({ msg: "error el buscar la order", err });
	}
};

module.exports = getOrderById;
