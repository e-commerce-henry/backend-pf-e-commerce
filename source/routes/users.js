const router = require("express").Router();
const postUser = require("../controllers/Users/postUser");

router.post("/register", postUser);

module.exports = router;
