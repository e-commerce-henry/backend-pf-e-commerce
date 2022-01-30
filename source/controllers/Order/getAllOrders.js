const { Order, OrderDetail } = require("../../db");

const getAllOrders = async (req, res) => {
	try {
		const orders = await Order.findAll({
			include: { model: OrderDetail },
		});
		console.log(orders);
		res.status(200).send(orders);
	} catch (error) {
		res.status(500).send({ msg: "Error al cargar todas las ordendes", error });
	}
};

module.exports = getAllOrders;
