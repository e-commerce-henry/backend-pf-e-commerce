const router = require("express").Router();
const postCartItem = require("../controllers/Cart/postCartItem");
const deleteCartItem = require("../controllers/Cart/delelteCartItem");

router.post("/", postCartItem);
router.delete("/", deleteCartItem);

module.exports = router;
