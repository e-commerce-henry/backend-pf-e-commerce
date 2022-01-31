const { Order, OrderDetail } = require("../../db.js");

const getAllOrdersByUser = async (req, res) => {
	let { userId } = req.params;
	if (!userId) {
		return res.status(400).send("userId es requerido");
	}
	try {
		const ordersByUser = await Order.findAll({
			where: { userId: userId },
			include: {
				model: OrderDetail,
				attributes: { exclude: ["createdAt", "updatedAt"] },
			},
		});

		res.status(200).json(ordersByUser);
	} catch (err) {
		res
			.status(500)
			.send({ msg: "error al cargar las ordenes del usuario", err });
	}
};

module.exports = getAllOrdersByUser;
