const express = require('express');
const IndexController = require('../controllers/index.controller');

const router = express.Router();

router.post('/tokenverify', IndexController.tokenverify);

module.exports = router;
