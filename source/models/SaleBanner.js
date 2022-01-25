const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("saleBanner", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		discount: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
	});
};
