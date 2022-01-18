const {DataTypes}=require('sequelize');

module.export=(sequelize)=>{
    sequelize.define("Products",{
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        surname:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        stock:{
            type:DataTypes.NUMBER,
            allowNull:false,
        },
        price:{
            type:DataTypes.FLOAT,
            allowNull:false,

        },
        img:{
            type:DataTypes.STRING,
            allowNull:false
        },
        brand:{
            type:DataTypes.STRING,
            allowNull:false,

        },
        description:{
            type:DataTypes.STRING,
            allowNull:null,
        }

    });


};