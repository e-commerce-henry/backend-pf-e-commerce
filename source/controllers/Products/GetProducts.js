const { Product } = requere('../../db.js')
const GetProducts = async ( req, res, next ) => {
    try {
        let produc = await Product.findAll()
        if (product.length ===0) {
            res.json({message:"no hay products"})
        } else {
            res.json(product)
        }
    } catch (error) {
        next(error)
    }
}