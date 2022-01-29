const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("order", {
		//la orden puede tener 3 estados:
		// -procesando (una vez q el usuario agrega productos al carro y procede al pago)
		// -cancelada (el usuario cancela la compra)
		// -completada (el usuario efectuo la compra)
		status: {
			type: DataTypes.ENUM("processing", "cancelled", "completed"),
			defaultValue: "processing",
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		total: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		shippingaddress: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};
