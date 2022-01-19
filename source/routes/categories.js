const { Router } = require('express')
const route = Router();


const { getCategory } = require('../controllers/Categories/GetCategory')
const { postCategory } = require('../controllers/Categories/PostCategory');



route.get('/', getCategory)
route.post('/',postCategory)


module.exports = route