const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("clientAddress", {
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		postalCode: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		city: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		province: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		floor: {
			type: DataTypes.STRING,
		},
	});
};
