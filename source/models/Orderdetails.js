const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define("ordedetails", {
		quantity:{
			type: DataTypes.NUMBER,
            allowNull:null,
    
		},
        total:{
            type:DataTypes.FLOAT,
            allowNull:null,
        }
	});
};