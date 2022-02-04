const mercadopago = require("mercadopago");
const { Order, OrderDetail } = require("../../db");

mercadopago.configure({
	access_token:
		"TEST-8933297648893953-013013-bed41c227baa431920b536a6ff217fdd-317544645",
});

const PayMP = async (req, res) => {
	const { orderId } = req.params;
	console.log(orderId);
	try {
		const order = await Order.findByPk(orderId, {
			include: {
				model: OrderDetail,
			},
		});
		const items = order.orderDetails.map((e) => ({
			title: e.name,
			unit_price: Number(e.price),
			quantity: Number(e.quantity),
			picture_url: e.img,
			currency_id: "ARS",
		}));
		console.log(items);
		let preference = {
			items, //array con todos los productos de la orden
			external_reference: orderId,

			// back_urls: {
			//     success:,
			//     failure: ,
			//     pending: ,
			// },
			// auto_return: "approved", // para que retorne al usuario a la ventana cuando el pago esta aprobado
			// binary_mode: true, // setea el resultado de pago en aprobado o desaprobado
		};
		console.log(preference);
		const response = await mercadopago.preferences.create(preference);
		const globalId = response.body.id;
		res.send(globalId);
	} catch (err) {
		console.log(err);
	}
};

module.exports = PayMP;
