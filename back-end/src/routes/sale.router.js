const express = require('express');
const SalesController = require('../controllers/sales.controller');

const router = express.Router();

router.post('/', SalesController.create);

module.exports = router; 
