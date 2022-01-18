const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("wishlistItem", {
		price: {
			type: DataTypes.FLOAT,
		},
	});
};
