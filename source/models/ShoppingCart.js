const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("cart", {
		total: {
			type: DataTypes.FLOAT,
		},
	});
};
