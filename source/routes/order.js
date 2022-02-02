const router = require("express").Router();
const editOrder = require("../controllers/Order/editOrder");
const getAllOrders = require("../controllers/Order/getAllOrders");
const getAllOrdersByUser = require("../controllers/Order/getAllOrdersByUser");
const createOrder = require("../controllers/Order/postOrder");
const { requireAuth, isAdmin } = require("../middleware/authMiddleware");

router.get("/:userId", getAllOrdersByUser);
router.get("/", [requireAuth, isAdmin], getAllOrders);
router.post("/:userId", createOrder);
router.put("/:userId", editOrder);

module.exports = router;
