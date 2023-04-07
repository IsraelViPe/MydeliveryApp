const express = require('express');
const OrderController = require('../controllers/order.controller');

const router = express();

router.get('/:id', OrderController.order);

module.exports = router;