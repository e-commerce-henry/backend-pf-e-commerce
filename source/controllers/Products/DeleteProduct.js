const { Product } = require('../../db.js');

const DeleteProduct = async (req, res, next) =>{
    try {
        const {id} = req.params;
        const prod = await Product.findByPk(id);
        if (!prod) {
            res.status(404).json({
                message:"producto eliminado con id" + id
            })
        };
        await prod.destroy()// eliminacion fisica;

        //eliminacion logica -> estado a 0
        // await usuario.update({estado:false})
        
        res.json(prod);
    } catch (error) {
        next(error)
    }
}

module.exports={
    DeleteProduct
}