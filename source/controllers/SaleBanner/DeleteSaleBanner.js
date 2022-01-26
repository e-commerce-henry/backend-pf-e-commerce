const { SaleBanner } = require("../../db.js");

const deleteSaleBanner = async (req, res) => {
	const { id } = req.params;
	try {
		let item = await SaleBanner.findByPk(id);
		console.log(item);
		if (!item) {
			res.status(400).json(null);
		} else {
			item.destroy();
			res.json("elemento borrado");
		}
	} catch (error) {
		res.status(500).send(error);
	}
};
module.exports = {
	deleteSaleBanner,
};
