const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("cartItem", {
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		img: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};
