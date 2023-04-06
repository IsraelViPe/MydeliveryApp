const express = require('express');
const SalesController = require('../controllers/sales.controller');

const router = express.Router();

router.post('/', SalesController.create);
router.get('/sale/:id', SalesController.getSales);
router.get('/customer/orders/:idVenda', SalesController.getSalesById);
router.patch('/customer/orders/:idVenda', SalesController.updateSales);

module.exports = router; 
