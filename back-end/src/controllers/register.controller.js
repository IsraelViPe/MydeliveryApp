const RegisterService = require('../services/register.service');
const { mapError } = require('../utils/errorMap');

const register = async (req, res, next) => {
  const userData = { ...req.body };

  const response = await RegisterService.register(userData);

  if (response.statusCode) {
    next(response);
    return;
  }

  const resp = mapError(response.message);

  return res.status(resp.statusCode).json({ message: resp.message });
};

module.exports = { register };
