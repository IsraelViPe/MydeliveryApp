const express = require('express');
const UserController = require('../controllers/user.controller');
const SalesController = require('../controllers/sales.controller');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/sellers', UserController.getAllSellers);
router.get('/customer/orders', verifyToken, SalesController.getSalesByCustomer);

module.exports = router;
