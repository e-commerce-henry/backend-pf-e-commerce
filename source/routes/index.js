const { Router } = require("express");
const router = Router();

const ProductsRoutes = require("./products");
const CategoryRoutes = require("./categories");
const SaleBannerRoutes = require("./saleBanner");
const UserRoutes = require("./users");
const WishlistRoutes = require("./wishlist");
const CartRoutes = require("./cart");
const ReviewRoutes = require("./review");

router.use("/products", ProductsRoutes);
router.use("/category", CategoryRoutes);
router.use("/saleBanner", SaleBannerRoutes);
router.use("/users", UserRoutes);
router.use("/wishlist", WishlistRoutes);
router.use("/cart", CartRoutes);
router.use("/productReview", ReviewRoutes)

module.exports = router;
