const mercadopago = require("mercadopago");
const { Order, OrderDetail, User, ClientAddress } = require("../../db");

mercadopago.configure({
	access_token:
		"APP_USR-8717096016242590-020619-1586316f5b80c5dab6580f0067901e04-1069754931",
});

const PayMP = async (req, res) => {
	const { orderId } = req.params;

	if (!orderId) {
		return res.status(404).send({ msg: "El orderId es requerido" });
	}

	try {
		const order = await Order.findByPk(orderId, {
			include: {
				model: OrderDetail,
			},
		});

		const user = await User.findByPk(order.userId, {
			include: {
				model: ClientAddress,
				where: {
					id: order.shippingAddress,
				},
			},
		});

		const items = order.orderDetails.map((e) => ({
			title: e.name,
			unit_price: Number(e.price),
			quantity: Number(e.quantity),
			picture_url: e.img,
			currency_id: "ARS",
		}));
		let preference = {
			items, //array con todos los productos de la orden
			external_reference: orderId,
			payer: {
				name: user.name,
				surname: user.surname,
				email: user.email,
			},
			back_urls: {
				success: `http://proyecto-personal.online/mercadoPago/pagos`,
				failure: `http://proyecto-personal.online/mercadoPago/pagos`,
			},
			payment_methods: {
				excluded_payment_types: [
					{
						id: "atm",
					},
				],
				installments: 12,
			},

			auto_return: "approved", // para que retorne al usuario a la ventana cuando el pago esta aprobado
			binary_mode: true, // setea el resultado de pago en aprobado o desaprobado
		};
		const response = await mercadopago.preferences.create(preference);
		const globalId = response.body.id;
		res.send(globalId);
	} catch (err) {
		console.log(err);
	}
};

module.exports = PayMP;
