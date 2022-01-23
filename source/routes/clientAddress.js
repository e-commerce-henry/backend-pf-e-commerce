const router = require("express").Router();
const addClientAddress = require("../controllers/ClientAddress/postClientAddress");
const editClientAddress = require("../controllers/ClientAddress/editClientAddress");
const deleteClientAddress = require("../controllers/ClientAddress/deleteClientAddress");

router.post("/:id", addClientAddress);
router.put("/:id/:addressId", editClientAddress);
router.delete("/:id/:addressId", deleteClientAddress);

module.exports = router;
