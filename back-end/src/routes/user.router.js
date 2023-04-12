const express = require('express');
const UserController = require('../controllers/user.controller');
const SalesController = require('../controllers/sales.controller');
const RegisterController = require('../controllers/register.controller');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/sellers', UserController.getAllSellers);
router.get('/:id', UserController.getUserById);
router.get('/seller/orders', verifyToken, SalesController.getSalesBySeller);
router.get('/customer/orders', verifyToken, SalesController.getSalesByCustomer);
router.post('/admin/manage', verifyToken, RegisterController.register);
router.get('/admin/manage', verifyToken, UserController.getAllNonAdmin);
router.delete('/admin/manage/:id', verifyToken, UserController.deleteUserById);

module.exports = router;
