const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("sale_banner", {
		discount: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
	});
};
