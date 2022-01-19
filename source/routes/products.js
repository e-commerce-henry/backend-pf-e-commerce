const { Router } = require('express');
const router = Router();

const  {getProducts} = require('../controllers/Products/GetProducts.js')
const { postProducts } = require('../controllers/Products/PostProduct')


router.get('/', getProducts );
router.post('/', postProducts)



module.exports=router;