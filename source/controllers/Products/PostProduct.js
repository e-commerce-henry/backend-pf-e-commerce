const { Product,Category,SaleBanner } = require('../../db.js')
const postProducts = async ( req, res, next ) => {
    try {
        const {name, stock, price, img, brand, description, category} = req.body

        let cat = await Category.findOne({
            where:{
                name:category
            }
        })

        if (!cat) {
            res.json({message:'No existe Category'})
        }

            let [newProduc, created] = await Product.findOrCreate({
                where:{name},
                defaults:{
                    stock,
                    price,
                    img,
                    brand,
                    description,
                    categoryId: cat.id
                }
            })
            console.log('newProduc :>> ', newProduc);
            res.status(200).json({created:created, newProduc});
        } catch (error) {
            next(error)
        }
}

module.exports={
    postProducts
}