const express = require('express');
const UserController = require('../controllers/user.controller');

const router = express.Router();

router.get('/sellers', UserController.getAllSellers);
router.get('/:id', UserController.getUserById);

module.exports = router; 
