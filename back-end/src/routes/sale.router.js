const express = require('express');
const SalesController = require('../controllers/sales.controller');

const router = express.Router();

router.post('/', SalesController.create);
router.get('/', SalesController.getAll);

module.exports = router; 
