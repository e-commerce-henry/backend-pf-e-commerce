const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("saleBanner", {
		discount: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
	});
};
