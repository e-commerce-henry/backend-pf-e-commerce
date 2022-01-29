const router = require("express").Router();
const postFavItem = require("../controllers/Wishlist/postFavItem");
const deleteFavItem = require("../controllers/Wishlist/deleteFavItem");
const getFavItem = require("../controllers/Wishlist/getFavItem");
const { requireAuth } = require("../middleware/authMiddleware");

router.post("/", postFavItem);

router.delete("/", deleteFavItem);


router.get("/:userId", getFavItem);

module.exports = router;
