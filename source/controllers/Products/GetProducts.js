const { Op } = require('sequelize');
const { Product } = require('../../db.js');


function searchName(name) {
    return Product.findAll({
        where:{
            name:{
                [Op.iLike]: `%${name}%`
            }
        }
    })
}

const getProducts = async ( req, res, next ) => {
    try {

        let { name } = req.query
        if (name) {
            let BDname = await searchName(name);
            if (BDname.length ===0) {
                res.json({message:"no hay products con ese name"})
            } else {
                res.json(BDname)
            }
        } else {
            let produc = await Product.findAll();

                if (produc.length ===0) {
                    res.json({message:"no hay products"})
                } else {
                    res.json(produc)
                }
        }


        
    } catch (error) {
        next(error)
    }
}
module.exports={
    getProducts
}