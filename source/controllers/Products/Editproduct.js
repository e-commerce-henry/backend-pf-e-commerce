const { Product } = require('../../db.js');

const EditProduct = async (req, res, next) =>{
    try {
        const { id } = req.params;
        const {name, surname, stock, price, img, brand, description} = req.body        
        const prod = await Product.findByPk(id);
        if (!prod) {
            return res.status(404).json({
                message:"No existe un Product con el id"+id
            })
        };
        
        await prod.update({name, surname, stock, price, img, brand, description});

        res.json(prod);
    } catch (error) {
        next(error)
    }
}

module.exports={
    EditProduct
}