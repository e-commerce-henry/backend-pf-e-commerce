const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("clientAddress", {
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};
