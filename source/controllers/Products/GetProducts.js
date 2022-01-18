const { Product } = requere('../../db.js')
const GetProducts = async ( req, res, next ) => {
    try {
        let produc = await Product.findAll()
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
    GetProducts
}