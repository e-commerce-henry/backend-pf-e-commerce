const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("order", {
		status:{
			type: DataTypes.NUMBER,
            allowNull:null,
    
		},
        date:{
            type:DataTypes.DATE,
            allowNull:null,
        },
        shippingaddress:{
            type:DataTypes.STRING,
            allowNull:null,

            
        }
	});
};