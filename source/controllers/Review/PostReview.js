const { Product, Review, User } = require('../../db');

const postReview = async (req, res, next) =>{

    try {
        
        let { id } = req.params;
        let {userId, content, rating, productId, title} = req.body;

        //busco si existe el producto por id
        let prod = await Product.findByPk(id);
        if (!prod) {
            res.json({
                message:"No existe el Producto"
            })
        }
        //busco si existe el usuario  por id
        let use = await User.findByPk(userId);
        if (!use) {
            res.json({
                message:"No existe Usuario"
            })
        }
        
        //crea un nuevo review
        let [newReview, created] = await Review.findOrCreate({
            where:{
                userId:userId,//prueba que no exista ya un userid
                productId:productId//prueba que no exista ya un prodId
            },
            defaults:{
                content:content,
                rating:rating,
                title:title
            }
        })

        res.json({created:created, newReview})

    } catch (error) {
        next(error)
    }
}

module.exports = {
    postReview
}