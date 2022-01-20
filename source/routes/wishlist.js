const router = require("express").Router();
const postFavItem = require("../controllers/Wishlist/postFavItem");
const deleteFavItem = require("../controllers/Wishlist/deleteFavItem");

router.post("/", postFavItem);
router.delete("/", deleteFavItem);

module.exports = router;
