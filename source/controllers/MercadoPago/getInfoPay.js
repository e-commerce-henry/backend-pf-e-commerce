const e = require("express");
const { Order } = require("../../db");

const getInfoPay = async (req, res) => {
	try {
		const { status, external_reference } = req.query;

		const order = await Order.findByPk(external_reference);
		console.log(order);
		const newOrderStatus = status === "approved" ? "completed" : "cancelled";

		await order.update({ status: newOrderStatus });
		console.log("orden actualizada");

		// res.redirect("http://localhost:3000/realizado");
		res.send("todo liso");
	} catch (err) {
		res.status(500).send(err);
	}
};
module.exports = getInfoPay;
