const router = require("express").Router();
const postCartItem = require("../controllers/Cart/postCartItem");
const deleteCartItem = require("../controllers/Cart/deleteCartItem");
const editCartItem = require("../controllers/Cart/editCartItem");

router.post("/", postCartItem);
router.delete("/", deleteCartItem);
router.put("/", editCartItem);

module.exports = router;
