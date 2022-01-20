const { Product,Category } = require('../../db.js');

const editProducts = async (req, res, next) =>{
    try {
        const { id } = req.params;
        const {name, stock, price, img, brand, description, category} = req.body   

        //compruebo si existe el producto
        const prod = await Product.findByPk(id);
        if (!prod) {
            return res.status(404).json({
                message:"No existe un Product con el id "+id
            })
        };

        let cat = await Category.findOne({
            where:{
                name:category
            }
        })
        console.log('cat.name :>> ', cat.name);
        if (!cat) {
            res.json({message:'No existe Category'})
        }


        await prod.update({name, stock, price, img, brand, description, categoryId:cat.id});

        res.json(prod);
    } catch (error) {
        next(error)
    }
}

module.exports={
    editProducts
}