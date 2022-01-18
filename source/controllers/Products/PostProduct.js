const { Product } = requere('../../db.js')
const PostProducts = async ( req, res, next ) => {
    try {
        const {name, surname, stock, price, img, brand, description} = req.body
            let [newProduc, created] = await Product.findOrCreate({
                where:{name},
                defaults:{
                    surname,
                    stock,
                    price,
                    img,
                    brand,
                    description
                }
            })
            res.status(200).json({created:created, newProduc});
        } catch (error) {
            next(error)
        }
}

module.exports={
    PostProducts
}