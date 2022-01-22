const { Review, Product } = require('../../db');

const getReview = async (req, res, next) => {

    try {
        
        const { id } = req.params;//viene el id del producto

        //busca el id del producto
        const prod = await Product.findByPk(id);
    
        if (!prod) {// mensaje de si no existe el producto
            res.json({
                message:"No existe Producto"
            })
        }
        
        //busca todos los review con el id de product
        const revi = await Review.findAll({
            where:{
                productId:prod.id
            }
        });
    
        res.json(revi);

    } catch (error) {
        next(error)
    }

}

module.exports = {
    getReview
}