const express = require('express');

const router = express.Router();

const LoginSchema = require('../services/validations/schemas/LoginSchema');
const mapError = require('../utils/errorMap');

router.post('/', (req, res, next) => {
  const { email, password } = req.body;
  const { error, value } = LoginSchema.validate({ email, password });

  if (error) {
    const err = mapError(error.message);
    next(err);
    return;
  }

  return res.status(200).json(value);
});

module.exports = router; 