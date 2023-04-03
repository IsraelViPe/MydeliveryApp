const RegisterService = require('../services/register.service');

const register = async (req, res, next) => {
  const userData = { ...req.body };

  const response = await RegisterService.register(userData);

  if (response.statusCode) {
    next(response);
    return;
  }
  console.log(response);
  return res.status(201).json(response);
};

module.exports = { register };
