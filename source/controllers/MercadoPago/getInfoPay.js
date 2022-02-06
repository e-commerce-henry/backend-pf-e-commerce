const e = require("express");
const { Order, OrderDetail, Product } = require("../../db");

const getInfoPay = async (req, res) => {
	try {
		const { status, external_reference } = req.query;

		const order = await Order.findByPk(external_reference, {
			include: { model: OrderDetail },
		});
		console.log(order);
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
			return await Promise.all(promises);
		}

		newOrderStatus === "completed"
			? res.redirect("http://localhost:3000/realizado")
			: res.redirect("http://localhost:3000/rechazada"); // crear componente y rutearlo
	} catch (err) {
		res.status(500).send(err);
	}
};
module.exports = getInfoPay;
