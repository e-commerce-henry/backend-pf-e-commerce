const { Product } = require('../../db.js');


const getProducts = async ( req, res, next ) => {
    try {
        let produc = await Product.findAll();
        console.log('produc :>> ', produc);
        if (produc.length ===0) {
            res.json({message:"no hay products"})
        } else {
            res.json(produc)
        }
    } catch (error) {
        next(error)
    }
}
module.exports={
    getProducts
}