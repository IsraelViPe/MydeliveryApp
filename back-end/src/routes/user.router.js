const express = require('express');
const UserController = require('../controllers/user.controller');
const SalesController = require('../controllers/sales.controller');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/sellers', UserController.getAllSellers); 
router.get('/admin', verifyToken, UserController.getAllUsers);
router.post('/admin', verifyToken, UserController.AddUser);
router.delete('/admin/:id', verifyToken, UserController.DeleteUser);
router.get('/:id', UserController.getUserById);
router.get('/seller/orders', verifyToken, SalesController.getSalesBySeller);
router.get('/customer/orders', verifyToken, SalesController.getSalesByCustomer);

module.exports = router;
