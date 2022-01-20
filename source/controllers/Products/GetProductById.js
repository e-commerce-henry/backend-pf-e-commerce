const { Product, Category } = require('../../db');


const getProductById = async (req, res, next) => {

    try {
        
        const { id } = req.params

        // const prod = await Product.findByPk(id,{
        //     include:[
        //         { 
        //         model: Category,
        //         attributes: ["id", "name"]
        //         }
        //     ]
        // });
        const prod = await Product.findOne({
            where:{id:id},
            attributes:{
                exclude:["createdAt","updatedAt","categoryId"]
            },
            include:[
                {
                    model:Category,
                    attributes:{
                        exclude:["createdAt","updatedAt"]
                    }
                }
            ]
        });

        if (!prod) {
            res.json({
                message:"No existe Producto con id "+id
            })
        }

        res.json(prod)

    } catch (error) {
        next(error)
    }

}

module.exports={
    getProductById
}