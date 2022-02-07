const e = require("express");
const { Order, OrderDetail, Product, Cart, CartItem } = require("../../db");

const getInfoPay = async (req, res) => {
	try {
		const { status, external_reference } = req.query;
		console.log(status);
		const order = await Order.findByPk(external_reference, {
			include: { model: OrderDetail },
		});
		const newOrderStatus = status === "approved" ? "completed" : "cancelled";

		await order.update({ status: newOrderStatus });
		console.log("orden actualizada");

		//si es aprobada, actualizo el stock en db
		if (status === "approved") {
			const promises = order.orderDetails.map(async (e) => {
				return await Product.decrement("stock", {
					by: e.quantity,
					where: { id: e.productId },
				});
			});
			await Promise.all(promises);

			//reseteo el carro del usuario
			const cart = await Cart.findOne({
				where: { userId: order.userId },
				include: { model: CartItem },
			});
			const promises2 = cart.cartItems.map(async (e) => {
				return await e.destroy();
			});
			await Promise.all(promises2);
		}

		newOrderStatus === "completed"
			? res.redirect("http://localhost:3000/realizado")
			: res.redirect("http://localhost:3000/rechazada"); // crear componente y rutearlo
	} catch (err) {
		res.status(500).send(err);
	}
};
module.exports = getInfoPay;
