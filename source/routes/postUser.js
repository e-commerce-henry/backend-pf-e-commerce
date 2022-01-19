const router = require("express").Router();
const postUser = require("../controllers/Users/postUser");

router.post("/", postUser);

module.exports = router;
