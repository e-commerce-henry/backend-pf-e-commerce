const router = require("express").Router();
const addClientAddress = require("../controllers/ClientAddress/postClientAddress");
const editClientAddress = require("../controllers/ClientAddress/editClientAddress");

router.post("/:id", addClientAddress);
router.put("/:id/:addressId", editClientAddress);

module.exports = router;
