const express = require('express');
const SalesController = require('../controllers/sales.controller');

const router = express.Router();

router.get('/orders/:id', SalesController.getSalesByCustomer);

module.exports = router;
