const { Op } = require('sequelize');
const { Product,Category } = require('../../db.js');


function searchName(name) {
    return Product.findAll({
        where:{
            name:{
                [Op.iLike]: `%${name}%`
            }
        },
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
    })
}

const getProducts = async ( req, res, next ) => {
    try {

        let { name } = req.query
        if (name) {
            let BDname = await searchName(name);
            if (BDname.length ===0) {
                res.json({message:"no hay products con ese name"})
            } else {
                res.json(BDname)
            }
        } else {
            let produc = await Product.findAll({
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

                if (produc.length ===0) {
                    res.json({message:"no hay products"})
                } else {
                    res.json(produc.sort((a,b)=>b.id - a.id))
                }
        }


        
    } catch (error) {
        next(error)
    }
}
module.exports={
    getProducts
}