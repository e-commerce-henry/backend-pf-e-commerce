const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("sub_category", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	});
};
