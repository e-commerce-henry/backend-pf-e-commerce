const { User, Order } = require("../../db.js");
const { Op } = require('sequelize');

const getHistoryById = async (req, res) => {

	let { idUser } = req.params;

	try{
		await User.findOne({
			where: { id: { [Op.iLike]: idUser } },
			
			include: [{
				model: Order,
				through: {
					attributes: [],
				},
			}],
		})
		
		res.status(200).json(User)

	}catch(err) { 
		
		res.status(400).send(err);
	}
};

module.exports = getHistoryById;