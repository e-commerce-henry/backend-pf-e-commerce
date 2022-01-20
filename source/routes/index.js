const {Router} = require('express');
const router = Router();


const ProductsRoutes = require('./products');
const CategoryRoutes = require('./categories');
const SaleBannerRoutes = require('./saleBanner');

router.use('/products',ProductsRoutes);
router.use('/category', CategoryRoutes );
router.use('/saleBanner', SaleBannerRoutes)






module.exports = router;
