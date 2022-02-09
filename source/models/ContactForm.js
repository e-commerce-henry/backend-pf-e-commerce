const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("contactForm", {
		email: {
			type: DataTypes.STRING,
			validate: {
				isEmail: true,
				notEmpty: true,
			},
		},

		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		subject: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},

		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},

		status: {
			type: DataTypes.ENUM("not answered", "answered"),
			defaultValue: "not answered",
			allowNull: false,
		},
	});
};
