const UserService = require('../services/user.service');

const getAllSellers = async (_req, res, _next) => {
  const response = await UserService.getAllSellers();

  return res.status(200).json(response);
};

module.exports = { getAllSellers };
