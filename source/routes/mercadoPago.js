const PayMP = require("../controllers/MercadoPago/mercadopago");

const router = require("express").Router();

router.post("/:orderId", PayMP);

module.exports = router;
