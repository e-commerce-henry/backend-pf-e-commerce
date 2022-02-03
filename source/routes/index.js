const { Router } = require("express");
const router = Router();

const ProductsRoutes = require("./products");
const CategoryRoutes = require("./categories");
const SaleBannerRoutes = require("./saleBanner");
const UserRoutes = require("./users");
const WishlistRoutes = require("./wishlist");
const CartRoutes = require("./cart");
const ReviewRoutes = require("./review");
const ClientAddressRoutes = require("./clientAddress");
const AuthRoutes = require("./auth");
const OrderRoutes = require("./order");
const MercadoPagoRoutes = require("./mercadoPago");

router.use("/products", ProductsRoutes);
router.use("/category", CategoryRoutes);
router.use("/saleBanner", SaleBannerRoutes);
router.use("/auth", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/wishlist", WishlistRoutes);
router.use("/cart", CartRoutes);
router.use("/productReview", ReviewRoutes);
router.use("/clientAddress", ClientAddressRoutes);
router.use("/orders", OrderRoutes);
router.use("/mercadoPago", MercadoPagoRoutes);

module.exports = router;
