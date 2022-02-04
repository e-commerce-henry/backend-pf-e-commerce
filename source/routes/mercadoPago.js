const router = require("express").Router();
const PayMP = require("../controllers/MercadoPago/mercadopago");
const getInfoPay = require("../controllers/MercadoPago/getInfoPay");

router.post("/:orderId", PayMP);
router.get("/pagos", getInfoPay);

module.exports = router;
