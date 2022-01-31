const { SaleBanner,Product } = require("../../db.js");
const getSaleBanner = async (req, res, next) => {
	try {
		let sale = await SaleBanner.findAll({
			attributes:{
				exclude:["createdAt","updatedAt"]
			},
			include:[
				{
					model:Product,
					attributes:{
						exclude:["createdAt","updatedAt","stock","description","categoryId","name"]
					}
				}
			]
		});
		if (sale.length === 0) {
			res.status(400).json(null);
		} else {
			res.json(sale);
		}
	} catch (error) {
		next(error);
	}
};
module.exports = {
	getSaleBanner,
};
