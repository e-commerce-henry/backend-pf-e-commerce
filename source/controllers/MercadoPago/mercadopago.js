const mercadopago = require("mercadopago");
const { Order, OrderDetail } = require("../../db");

mercadopago.configure({
	access_token:
		"TEST-2740297351268044-012718-d897c3fceba48737188059496e0ec59f-237469205",
});

const PayMP = async (req, res) => {
	// const { cart } = req.body;
	const { orderId } = req.params;
	console.log(orderId);
	try {
		const order = await Order.findByPk(orderId, {
			include: {
				model: OrderDetail,
			},
		});

		const items = order.orderDetails.map((e) => ({
			title: e.title,
			unit_price: Number(e.price),
			quantity: Number(e.quantity),
			picture_url: e.img,
		}));

		// let preference = {
		// 	items: orderItems, //array con todos los productos de la orden
		// 	external_reference: orderId,
		// 	payment_methods: {
		// 		excluyed_payment_types: [
		// 			{
		// 				id: "atm",
		// 			},
		// 		],
		// 		installments: 3,
		// 	},
		// 	back_urls: {
		// 	    success: `/mercadopago/pagos` || "http://localhost:3001/mercadopago/pagos",
		// 	    failure: `/` || "http://localhost:3000/",
		// 	    pending: `/` || "http://localhost:3000/",
		// 	},
		// };

		// const response = await mercadopago.preferences.create(preference);
		// const preferenceId = response.body.id;
		res.send(orderItems);
	} catch (err) {
		console.log(err);
	}
};

module.exports = PayMP;
