const BD  =  require('../../../BD.json')
const { Category, Product } = require('../../db');

const preChargeCategories= async (req, res, next) =>{

    try {
        let filtro_cat = await BD.map(e =>e.Category);
        let list_cate =await filtro_cat.filter( e => e!== undefined)
        let cat = [...new Set(list_cate)]

        await cat.map( p => Category.findOrCreate({where:{name:p}}))
        
    } catch (error) {
        next(error)
    }
}

const preChargeProduct = async (req, res, next) =>{
    try {
// filter_BD filtra un array que no contenga undefined en Category
    let filter_BD = await BD.filter(e => e.Category !== undefined);
//aqui se ejecutara y creara por cada objeto del array filtrado
    for (const i of filter_BD) {
        let cat_id =await Category.findOne({where:{name:i.Category}})
        // console.log('cat_id :>> ', cat_id);

        await Product.findOrCreate({
            where:{name:i.Name},
            defaults:{
                stock: i.Stock,
                price: i.Price,
                img: i.Img,
                brand: i.Brand,
                description: i.Description,
                categoryId: cat_id.id
            }
        })
    }

    } catch (error) {
        next(error)
    }
}

module.exports ={
    preChargeCategories,
    preChargeProduct
}