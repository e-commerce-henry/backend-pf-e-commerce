const { Router } = require("express");
const router = Router();

const ProductsRoutes = require("./products");
const CategoryRoutes = require("./categories");
const SaleBannerRoutes = require("./saleBanner");
const UserRoutes = require("./users");
const WishlistRoutes = require("./wishlist");

router.use("/products", ProductsRoutes);
router.use("/category", CategoryRoutes);
router.use("/saleBanner", SaleBannerRoutes);
router.use("/users", UserRoutes);
router.use("/wishlist", WishlistRoutes);

module.exports = router;
