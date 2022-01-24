const router = require("express").Router();
const getHistoryById = require("../controllers/Order/getHistoryUser");



router.get("/:id",getHistoryById);


module.exports = router;