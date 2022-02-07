const { Router } = require("express");
const route = Router();

const { getCategory } = require("../controllers/Categories/GetCategory");
const { postCategory } = require("../controllers/Categories/PostCategory");
const { editCategory } = require("../controllers/Categories/EditCategory");
const { deleteCategory } = require("../controllers/Categories/DeleteCategory");
const { requireAuth, isAdmin } = require("../middleware/authMiddleware");

route.get("/", getCategory);
route.post("/", [requireAuth, isAdmin], postCategory);
route.put("/:id", editCategory);
route.delete("/:id", [requireAuth, isAdmin], deleteCategory);

module.exports = route;
