const router = require("express").Router();
const addClientAddress = require("../controllers/ClientAddress/postClientAddress");

router.post("/:id", addClientAddress);

module.exports = router;
