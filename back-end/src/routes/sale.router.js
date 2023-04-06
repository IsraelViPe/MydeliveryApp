const express = require('express');
const SalesController = require('../controllers/sales.controller');

const router = express.Router();

router.post('/', SalesController.create);
router.get('/get-orders/:id', SalesController.getOrdersById);

module.exports = router; 
