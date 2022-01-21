const router = require("express").Router();
const postCartItem = require("../controllers/Cart/postCartItem");

router.post("/", postCartItem);

module.exports = router;
