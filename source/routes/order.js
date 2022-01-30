const router = require("express").Router();
const editOrder = require("../controllers/Order/editOrder");
const getAllOrders = require("../controllers/Order/getAllOrders");
const getAllOrdersByUser = require("../controllers/Order/getAllOrdersByUser");
const createOrder = require("../controllers/Order/postOrder");

router.get("/:userId", getAllOrdersByUser);
router.get("/", getAllOrders);
router.post("/:userId", createOrder);
router.put("/:userId", editOrder);

module.exports = router;
