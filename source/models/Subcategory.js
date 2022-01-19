const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("subCategory", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	});
};
