const router = require("express").Router();
const postUser = require("../controllers/Users/postUser");
const deleteUser = require("../controllers/Users/deleteUser");

router.post("/register", postUser);
router.delete("/deleteUser", deleteUser);

module.exports = router;
