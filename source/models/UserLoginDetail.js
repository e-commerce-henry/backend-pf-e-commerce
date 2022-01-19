const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("userLoginDetail", {
		password: {
			type: DataTypes.STRING(30),
			allowNull: false,
		},
	});
};
