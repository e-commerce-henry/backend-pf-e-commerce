const { Product,Category,SaleBanner } = require('../../db.js')
const postProducts = async ( req, res, next ) => {
    try {
        const {name, stock, price, img, brand, description, category, saleBanner} = req.body

        let cat = await Category.findOne({
            where:{
                name:category
            }
        })

        if (!cat) {
            res.json({message:'No existe Category'})
        }

        let sale = await SaleBanner.findOne({
            where:{
                discount:saleBanner
            }
        })
        if (!sale) {
            res.json({message:'No existe saleBanner'})
        }

            let [newProduc, created] = await Product.findOrCreate({
                where:{name},
                defaults:{
                    stock,
                    price,
                    img,
                    brand,
                    description,
                    categoryId: cat.id,
                    saleBannerId:sale.id
                }
            })
            res.status(200).json({created:created, newProduc});
        } catch (error) {
            next(error)
        }
}

module.exports={
    postProducts
}