const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("product", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		stock: {
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
		brand: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: null,
		},
	});
};
