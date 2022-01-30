const router = require("express").Router();
const editOrder = require("../controllers/Order/editOrder");
const getHistoryById = require("../controllers/Order/getHistoryUser");
const createOrder = require("../controllers/Order/postOrder");

router.get("/:idUser", getHistoryById);
router.post("/:userId", createOrder);
router.put("/:userId", editOrder);

module.exports = router;
