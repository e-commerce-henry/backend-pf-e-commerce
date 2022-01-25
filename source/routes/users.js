const router = require("express").Router();
const postUser = require("../controllers/Users/postUser");
const deleteUser = require("../controllers/Users/deleteUser");
const editUser = require("../controllers/Users/editUser");
const { requireAuth, isAdmin } = require("../middleware/authMiddleware");

router.post("/", postUser);
router.delete("/:id", [requireAuth, isAdmin], deleteUser);
router.put("/:id", editUser);

module.exports = router;
