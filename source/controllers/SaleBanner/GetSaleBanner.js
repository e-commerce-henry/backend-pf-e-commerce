const { SaleBanner } = require('../../db.js')
const getSaleBanner = async ( req, res, next ) => {
    try {
        let sale = await SaleBanner.findAll()
        if (sale.length ===0) {
            res.json({message:"no hay categories"})
        } else {
            res.json(sale)
        }
    } catch (error) {
        next(error)
    }
}
module.exports={
    getSaleBanner
}