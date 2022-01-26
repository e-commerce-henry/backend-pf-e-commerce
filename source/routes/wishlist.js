const router = require("express").Router();
const postFavItem = require("../controllers/Wishlist/postFavItem");
const deleteFavItem = require("../controllers/Wishlist/deleteFavItem");
const getFavItem = require("../controllers/Wishlist/getFavItem");
const { requireAuth } = require("../middleware/authMiddleware");

router.post("/", requireAuth, postFavItem);
router.delete("/", requireAuth, deleteFavItem);
router.get("/", requireAuth, getFavItem);

module.exports = router;
