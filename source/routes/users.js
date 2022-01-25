const router = require("express").Router();
const postUser = require("../controllers/Users/postUser");
const deleteUser = require("../controllers/Users/deleteUser");
const editUser = require("../controllers/Users/editUser");
const { requireAuth, isAdmin } = require("../middleware/authMiddleware");
const getAllUsers = require("../controllers/Users/getUsers");

router.post("/", postUser);
router.delete("/:id", deleteUser);
router.put("/:id", editUser);
router.get("/", getAllUsers); // should be protected

module.exports = router;
