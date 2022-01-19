const { Category } = require('../../db.js')
const getCategory = async ( req, res, next ) => {
    try {
        let cat = await Category.findAll()
        if (cat.length ===0) {
            res.json({message:"no hay categories"})
        } else {
            res.json(cat)
        }
    } catch (error) {
        next(error)
    }
}
module.exports={
    getCategory
}