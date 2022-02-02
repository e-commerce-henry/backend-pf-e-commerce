const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("clientAddress", {
		address: {
			type: DataTypes.STRING,
		},

		postalCode: {
			type: DataTypes.STRING,
		},

		city: {
			type: DataTypes.STRING,
		},

		province: {
			type: DataTypes.STRING,
		},

		floor: {
			type: DataTypes.STRING,
		},
	});
};
