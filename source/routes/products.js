const { Router } = require("express");
const router = Router();

const { getProducts } = require("../controllers/Products/GetProducts.js");
const { postProducts } = require("../controllers/Products/PostProduct");
const { editProducts } = require("../controllers/Products/Editproduct");
const { deleteProducts } = require("../controllers/Products/DeleteProduct");
const { getProductById } = require("../controllers/Products/GetProductById");
const { requireAuth, isAdmin } = require("../middleware/authMiddleware");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", [requireAuth, isAdmin], postProducts);
router.put("/:id", [requireAuth, isAdmin], editProducts);
router.delete("/:id", deleteProducts);

module.exports = router;
