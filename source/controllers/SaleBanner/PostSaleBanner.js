const {SaleBanner} = require('../../db.js');

const postSaleBanner = async(req, res, next) =>{
    try {
    const {discount,product} = req.body
        let [newSaleBanner, created] = await SaleBanner.findOrCreate({
            where:{discount}
        })
        res.status(200).json({created:created, newSaleBanner});
    } catch (error) {
        next(error)
    }
}

module.exports = {
    postSaleBanner
};