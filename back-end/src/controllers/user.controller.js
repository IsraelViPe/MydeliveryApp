const UserService = require('../services/user.service');
const { codes } = require('../utils/errorMap');

const getAllSellers = async (_req, res, _next) => {
  const response = await UserService.getAllSellers();

  return res.status(codes.OK).json(response);
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;

  const response = await UserService.getUserById(id);

  if (response.statusCode) {
    next(response);
    return;
  }

  return res.status(codes.OK).json(response);
};

module.exports = { getAllSellers, getUserById };
