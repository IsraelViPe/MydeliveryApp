const express = require('express');
const verifyToken = require('../middlewares/verifyToken');

const SalesController = require('../controllers/sales.controller');

const router = express.Router();

router.post('/', verifyToken, SalesController.create);
router.get('/', SalesController.getAll);
router.put('/:id', verifyToken, SalesController.updateStatus);

module.exports = router; 
