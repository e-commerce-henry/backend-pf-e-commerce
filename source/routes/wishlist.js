const router = require("express").Router();
const postFavItem = require("../controllers/Wishlist/postFavItem");

router.post("/", postFavItem);

module.exports = router;
