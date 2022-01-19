const { Router } = require('express')
const route = Router();

const { getSaleBanner } = require('../controllers/SaleBanner/GetSaleBanner')
const { postSaleBanner } = require('../controllers/SaleBanner/PostSaleBanner')

route.get('/', getSaleBanner)
route.post('/', postSaleBanner)


module.exports = route;