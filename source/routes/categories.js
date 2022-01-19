const { Router } = require('express')
const route = Router();


const { getCategory } = require('../controllers/Categories/GetCategory')
const { postCategory } = require('../controllers/Categories/PostCategory');
const { editCategory } = require ('../controllers/Categories/EditCategory')

const { deleteCategory } = require('../controllers/Categories/DeleteCategory')


route.get('/', getCategory)
route.post('/',postCategory)
route.put('/:id',editCategory)
route.delete('/:id',deleteCategory)


module.exports = route