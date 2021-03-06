const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("review", {
		title: {
			type: DataTypes.STRING(25),
			allowNull: false,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		rating: {
			type: DataTypes.ENUM("1", "2", "3", "4", "5"),
			allowNull: false,
		},
	});
};
