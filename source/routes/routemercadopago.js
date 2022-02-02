const { Router } = require('express');
const { mercadop, pagos } = require('../controllers/Mercadopago/mercadopago');
const router = Router();

router.post("/:id",mercadop);

router.get("/pagos",pagos);

module.exports = router;