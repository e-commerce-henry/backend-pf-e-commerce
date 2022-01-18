const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("user", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		surname: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
				notEmpty: true,
			},
		},

		role: {
			type: DataTypes.ENUM("user", "admin"),
			defaultValue: "user",
			allowNull: false,
		},
	});
};
