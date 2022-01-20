const router = require("express").Router();
const postUser = require("../controllers/Users/postUser");
const deleteUser = require("../controllers/Users/deleteUser");
const editUser = require("../controllers/Users/editUser");

router.post("/", postUser);
router.delete("/:id", deleteUser);
router.put("/:id", editUser);

module.exports = router;
