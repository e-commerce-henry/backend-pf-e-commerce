const { Order } = require("../../db");

const editOrder = async (req, res) => {
	console.log(req.body);
	const { orderId } = req.params;
	const { status, shippingStatus, total } = req.body; // si respuesta de mercado pago es positiva, se cambia el status a "completada".
	if (!total || !orderId || !shippingStatus || !status) {
		return res
			.status(400)
			.send("Se require orderId, status, shippingStatus y total");
	}
	try {
		const foundOrder = await Order.findByPk(orderId);
		const modifiedOrder = await foundOrder.update({
			status,
			shippingStatus,
			total,
		});

		res.status(200).send({ message: "orden actualizada", modifiedOrder });
	} catch (error) {
		res
			.status(500)
			.send({ msg: "error al modificar orden u orden no econtrada", error });
	}
};

module.exports = editOrder;
