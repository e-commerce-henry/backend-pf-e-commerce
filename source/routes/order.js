const router = require("express").Router();
const getHistoryById = require("../controllers/Order/getHistoryUser");
const createOrder = require("../controllers/Order/postOrder");

router.get("/:idUser", getHistoryById);
router.post("/:userId", createOrder);

module.exports = router;
