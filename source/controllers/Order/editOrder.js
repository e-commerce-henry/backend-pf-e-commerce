const { Order } = require("../../db");

const editOrder = async (req, res) => {
	const { userId } = req.params;
	const { orderId, status, shippingStatus } = req.body; // si respuesta de mercado pago es positiva, se cambia el status a "completada".
	if (!userId || !orderId || (!status && !shippingStatus)) {
		return res
			.status(400)
			.send("Se require userId, orderId y status o shippingStatus");
	}
	try {
		const foundOrder = await Order.findByPk(orderId);
		// hay que ver como es la respuesta de Mercado Pago.
		const modifiedOrder = await foundOrder.update({
			status: status ? status : foundOrder.status,
			shippingStatus: shippingStatus
				? shippingStatus
				: foundOrder.shippingStatus,
		});

		res.status(200).send({ message: "orden actualizada", modifiedOrder });
	} catch (error) {
		res
			.status(500)
			.send({ msg: "error al modificar orden u orden no econtrada", error });
	}
};

module.exports = editOrder;
